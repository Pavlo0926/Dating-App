import React from "react";
import { View, ScrollView, Dimensions, Platform } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { widthPercentageToDP as wp } from "@helpers";
import styles from "./wheel-scroll.style";

const deviceWidth = Dimensions.get("window").width;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export default class ScrollPicker extends React.Component {
  constructor(props) {
    super(props);
    this.onMomentumScrollBegin = this.onMomentumScrollBegin.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      selectedIndex: 1,
    };
  }

  componentDidMount() {
    if (typeof this.props.selectedIndex !== undefined) {
      this.scrollToIndex(this.props.selectedIndex);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { header, footer } = this.renderPlaceHolder();
    const {
      wrapperHeight,
      wrapperWidth,
      wrapperBackground,
      highlightWidth,
      highlightColor,
    } = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            height: wrapperHeight,
            width: wrapperWidth,
            backgroundColor: wrapperBackground,
          },
        ]}
      >
        <LinearGradient
          colors={GRADIENT.WHEEL_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.topGradientBackground]}
        />
        <LinearGradient
          colors={GRADIENT.WHEEL_BACKGROUND}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={[styles.bottomGradientBackground]}
        />
        <View
          style={[
            styles.highlightView,
            {
              top: (wrapperHeight - wp(35)) / 2,
              width: highlightWidth,
              backgroundColor: highlightColor,
            },
          ]}
        />
        <View style={styles.scrollViewContainer}>
          <ScrollView
            ref={sview => {
              this.sview = sview;
            }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            onTouchStart={this.props.onTouchStart}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            onScrollBeginDrag={this.onScrollBeginDrag}
            onScrollEndDrag={this.onScrollEndDrag}
            onScroll={this.onScroll}
            style={styles.scrollContainer}
          >
            {header}
            {this.props.dataSource.map(this.renderItem.bind(this))}
            {footer}
          </ScrollView>
        </View>
      </View>
    );
  }

  renderPlaceHolder() {
    const height = (this.props.wrapperHeight - wp(40) - this.props.itemHeight) / 2;
    const header = <View style={[{ height }, styles.flexFill]} />;
    const footer = <View style={[{ height }, styles.flexFill]} />;
    return { header, footer };
  }

  renderItem(data, index) {
    const isSelected = index === this.state.selectedIndex;
    const item = (
      <Text
        style={isSelected ? this.props.activeItemTextStyle : this.props.itemTextStyle}
      >
        {data}
      </Text>
    );

    return (
      <Touchable
        key={index}
        style={[styles.selectedItem, { height: this.props.itemHeight }]}
        onPress={() => {
          this.scrollToIndex(index);
          // onValueChange
          if (this.props.onValueChange) {
            const selectedValue = this.props.dataSource[index];
            this.props.onValueChange(selectedValue, index);
          }
        }}
      >
        {item}
      </Touchable>
    );
  }

  scrollFix(e) {
    let verticalY = 0;
    const h = this.props.itemHeight;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    const selectedIndex = Math.round(verticalY / h);
    const verticalElem = selectedIndex * h;
    if (verticalElem !== verticalY) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === "ios") {
        this.isScrollTo = true;
      }
      if (this.sview) {
        this.sview.scrollTo({ y: verticalElem });
      }
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    this.setState({
      selectedIndex,
    });
    // onValueChange
    if (this.props.onValueChange) {
      const selectedValue = this.props.dataSource[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  }

  onScroll(e) {
    const selectedIndex = Math.round(
      e.nativeEvent.contentOffset.y / this.props.itemHeight,
    );
    if (this.currentIndex !== selectedIndex) {
      this.currentIndex = selectedIndex;
      ReactNativeHapticFeedback.trigger("impactLight", options);
    }
  }

  onScrollBeginDrag() {
    this.dragStarted = true;
    this.currentIndex = this.state.selectedIndex;
    if (Platform.OS === "ios") {
      this.isScrollTo = false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onScrollEndDrag(e) {
    this.props.onScrollEndDrag();
    this.dragStarted = false;
    // if not used, event will be garbaged
    const element = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this.scrollFix(element, "timeout");
      }
    }, 10);
  }

  onMomentumScrollBegin() {
    this.momentumStarted = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onMomentumScrollEnd(e) {
    this.props.onMomentumScrollEnd();
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this.scrollFix(e);
    }
  }

  scrollToIndex(ind) {
    this.setState({
      selectedIndex: ind,
    });
    const y = this.props.itemHeight * ind;
    setTimeout(() => {
      if (this.sview) {
        this.sview.scrollTo({ y });
      }
    }, 0);
  }
}
ScrollPicker.propTypes = {
  style: PropTypes.object,
  dataSource: PropTypes.array,
  selectedIndex: PropTypes.number,
  onValueChange: PropTypes.func,
  renderItem: PropTypes.func,
  highlightColor: PropTypes.string,
  itemHeight: PropTypes.number,
  wrapperBackground: PropTypes.string,
  wrapperWidth: PropTypes.number,
  wrapperHeight: PropTypes.number,
  highlightWidth: PropTypes.number,
  highlightBorderWidth: PropTypes.number,
  itemTextStyle: PropTypes.object,
  activeItemTextStyle: PropTypes.object,
  onMomentumScrollEnd: PropTypes.func,
  onScrollEndDrag: PropTypes.func,
};
ScrollPicker.defaultProps = {
  dataSource: [1, 2, 3],
  itemHeight: 60,
  wrapperBackground: "#FFFFFF",
  wrapperHeight: 180,
  wrapperWidth: 150,
  highlightWidth: deviceWidth,
  highlightBorderWidth: 2,
  highlightColor: "#333",
  onMomentumScrollEnd: () => {},
  onScrollEndDrag: () => {},
  itemTextStyle: { fontSize: 20, lineHeight: 26, textAlign: "center", color: "#B4B4B4" },
  activeItemTextStyle: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
    color: "#222121",
  },
};
