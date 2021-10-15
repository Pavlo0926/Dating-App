import React, { Component } from "react";
import { ScrollView, View, Platform } from "react-native";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";

import styles from "./fade-scrollview.style";
const defaultFadeColors = ["rgba(26, 2, 62, 0.18)", "rgba(26, 2, 62, 1)"];

class FadeScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // We don't know the size of the content initially, and the probably won't instantly try to scroll,
      // so set the initial content height and width to 0
      scrollHeight: 0,
      scrollWidth: 0,
      availableWidth: 0,
      availableHeight: 0,
      allowStartFade: false,
      allowEndFade: true,
    };
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ scrollHeight: contentHeight, scrollWidth: contentWidth });
  };

  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;
    const containerHeight = event.nativeEvent.layout.height;

    this.setState({ availableWidth: containerWidth, availableHeight: containerHeight });
  }

  isEndFadeAllowed() {
    const sizeToCompare = this.props.horizontal
      ? this.state.scrollWidth
      : this.state.scrollHeight;
    const availableSpace = this.props.horizontal
      ? this.state.availableWidth
      : this.state.availableHeight;
    return this.props.allowEndFade ? sizeToCompare > availableSpace : false;
  }

  ifCloseToStart({ layoutMeasurement, contentOffset, contentSize }) {
    return this.props.horizontal
      ? contentOffset.x < this.props.scrollThreshold
      : contentOffset.y < this.props.scrollThreshold;
  }
  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return this.props.horizontal
      ? layoutMeasurement.width + contentOffset.x >=
          contentSize.width - this.props.scrollThreshold
      : layoutMeasurement.height + contentOffset.y >=
          contentSize.height - this.props.scrollThreshold;
  }

  //To avoid ScrollView RTL issue on andorid.
  allowReverse() {
    return Platform.OS === "android" && this.props.isRtl;
  }
  onScrolled = e => {
    if (this.props.isCloseToEnd) {
      this.props.isCloseToEnd(this.isCloseToBottom(e.nativeEvent));
    }
    if (this.props.isCloseToStart) {
      this.props.isCloseToStart(this.ifCloseToStart(e.nativeEvent));
    }
    if (this.props.allowStartFade) {
      if (!this.allowReverse()) {
        this.setState({
          allowStartFade: this.ifCloseToStart(e.nativeEvent) ? false : true,
        });
      } else {
        this.setState({
          allowEndFade: this.ifCloseToStart(e.nativeEvent) ? false : true,
        });
      }
    }
    if (this.props.allowEndFade) {
      if (!this.allowReverse()) {
        this.setState({
          allowEndFade: this.isCloseToBottom(e.nativeEvent) ? false : true,
        });
      } else {
        this.setState({
          allowStartFade: this.isCloseToBottom(e.nativeEvent) ? false : true,
        });
      }
    }
    if (this.props.onScroll) {
      this.props.onScroll();
    }
  };

  //get start fade view
  getStartFaade() {
    return this.props.horizontal ? (
      <LinearGradient
        start={{ x: this.props.isRtl ? 0 : 1, y: 0 }}
        end={{ x: this.props.isRtl ? 1 : 0, y: 0 }}
        style={[styles.fadeContainer, { width: this.props.fadeSize }]}
        colors={this.props.fadeColors}
        pointerEvents={"none"}
      />
    ) : (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[styles.fadeSVContainer, { height: this.props.fadeSize }]}
        colors={this.props.fadeColors}
        pointerEvents={"none"}
      />
    );
  }

  getEndFade() {
    return this.props.horizontal ? (
      <LinearGradient
        start={{ x: this.props.isRtl ? 1 : 0, y: 0 }}
        end={{ x: this.props.isRtl ? 0 : 1, y: 0 }}
        style={[styles.fadeEHContainer, { width: this.props.fadeSize }]}
        colors={this.props.fadeColors}
        pointerEvents={"none"}
      />
    ) : (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.fadeEVContainer, { height: this.props.fadeSize }]}
        colors={this.props.fadeColors}
        pointerEvents={"none"}
      />
    );
  }

  render() {
    const endFadeEnable = this.isEndFadeAllowed();
    return (
      <View
        style={[
          styles.container,
          this.props.horizontal ? styles.flexRow : styles.flexColumn,
        ]}
        onLayout={this._onLayout.bind(this)}
      >
        <ScrollView
          {...this.props}
          style={[styles.scrollViewStyle, this.props.style]}
          onContentSizeChange={this.onContentSizeChange}
          scrollEventThrottle={16}
          onScroll={this.onScrolled}
        >
          {this.props.children}
        </ScrollView>
        {this.state.allowStartFade && this.getStartFaade()}
        {endFadeEnable && this.state.allowEndFade && this.getEndFade()}
      </View>
    );
  }
}

FadeScrollView.propTypes = {
  allowStartFade: PropTypes.bool,
  allowEndFade: PropTypes.bool,
  fadeSize: PropTypes.number,
  fadeColors: PropTypes.array,
  isCloseToEnd: PropTypes.func,
  isCloseToStart: PropTypes.func,
  scrollThreshold: PropTypes.number,
  isRtl: PropTypes.bool,
};
FadeScrollView.defaultProps = {
  allowStartFade: false,
  allowEndFade: true,
  fadeSize: 20,
  fadeColors: defaultFadeColors,
  scrollThreshold: 10,
  isRtl: false,
};

export default FadeScrollView;
