import React from "react";
import { Dimensions, View, SafeAreaView, Animated } from "react-native";
import FastImage from "react-native-fast-image";
import { Touchable, CardProgressBar, Text, Image } from "@components";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import Header from "../header";

import styles from "./card.style";

const screenWidth = Dimensions.get("window").width;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };

    if (this.props.card && this.props.card.images && this.props.card.images.length > 0) {
      FastImage.preload(this.props.card.images.map(item => ({ uri: item.path ? item.path : "https://via.placeholder.com/728x90.png?text=No+Image" })));
    }
    this._rightAnimValue = new Animated.Value(0);
  }

  componentDidMount() {
    this._animationRef = Animated.loop(
      Animated.sequence([
        Animated.timing(this._rightAnimValue, {
          toValue: 1,
          duration: 1000,
          delay: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(this._rightAnimValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(this._rightAnimValue, {
          toValue: -1,
          duration: 1000,
          delay: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(this._rightAnimValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    if (this.props.index === 0 && this.props.showAnimation) this._animationRef.start();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.index === 0 && prevProps.showAnimation !== this.props.showAnimation) {
      if (this.props.showAnimation) {
        this._animationRef.start();
      } else {
        this._animationRef.reset();
      }
    }
  }

  onCardPressed = (e) => {
    let newIndex = 0;
    const { imageIndex } = this.state;
    const { card } = this.props;
    let isBio = card.bio !== undefined && card.bio !== null && card.bio !== "";

    if (e.nativeEvent.locationX < screenWidth / 375 * 140) {
      // left
      newIndex =
        imageIndex === 0
          ? isBio
            ? card.images.length
            : card.images.length - 1
          : imageIndex - 1;
    } else {
      // right
      if (isBio) {
        newIndex = imageIndex === card.images.length ? 0 : imageIndex + 1;
      } else {
        newIndex = imageIndex === card.images.length - 1 ? 0 : imageIndex + 1;
      }
    }
    this.props.onClickedCard && this.props.onClickedCard();
    this.setState({imageIndex: newIndex});
    ReactNativeHapticFeedback.trigger("impactLight", options);
  }

  renderCard = () => {
    const { card, showAnimation } = this.props;
    const { imageIndex } = this.state;

    if (!card) {
      return null;
    }

    let isBio = card.bio !== undefined && card.bio !== null && card.bio !== "";

    return (<Touchable
      style={styles.container}
      activeOpacity={1}
      onPress={e => this.onCardPressed(e)}
    >
      <View style={styles.card}>
        {card && card.images && card.images.length > 0 ? (
          imageIndex > card.images.length - 1 ? (
            <View style={styles.cardImage}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: card.images[0].path }}
                style={styles.cardImage}
              />
              <View style={styles.overlayView} />
            </View>
          ) : (
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: card.images[imageIndex].path }}
              style={styles.cardImage}
            />
          )
        ) : (
          <View style={styles.cardImage} />
        )}
      </View>
      <View style={styles.topActions}>
        <LinearGradient
          colors={GRADIENT.FADE_UP}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientOpacityBack}
        />
        <SafeAreaView pointerEvents={"box-none"}>
          <CardProgressBar
            count={isBio ? card.images.length + 1 : card.images.length}
            activeIndex={imageIndex}
            onPress={index => {
              this.setState({imageIndex: index});
            }}
          />
          <Header
            item={card}
            showBio={card && imageIndex > card.images.length - 1}
            onReport={() => this.props.onReport((card.id || card._id))}
          />
        </SafeAreaView>
      </View>
      {showAnimation && 
      <View style={styles.tutorialContainer}>
        <Animated.View style={[styles.tutorialMarkContainer, 
          { 
            opacity: this._rightAnimValue.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [0, 0, 1]
            })
          }]} pointerEvents={"box-none"}>
          <Image
            source={require("@assets/images/swipe-screen/swipe-heart.png")}
            style={styles.tutorialMarkIcon} />
          <View style={styles.tutorialMarkHeart} pointerEvents={"box-none"}>
            <Text style={styles.heartText}>
              {"Swipe right to add"}
            </Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.tutorialMarkContainer, 
          { 
            opacity: this._rightAnimValue.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [1, 0, 0]
            })
          }]} pointerEvents={"box-none"}>
          <Image
            source={require("@assets/images/swipe-screen/swipe-cross.png")}
            style={styles.tutorialMarkIcon} />
          <View style={styles.tutorialMarkCross} pointerEvents={"box-none"}>
            <Text style={styles.crossText}>
              {"Swipe left to pass"}
            </Text>
          </View>
        </Animated.View>
      </View>}
    </Touchable>)
  }

  render() {
    return (
      <View style={styles.flexFill}>
        <Animated.View style={[styles.container, 
          {transform: [{ 
              translateX: this._rightAnimValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-70, 0, 70]
              }),
            }, {
              rotate: this._rightAnimValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: ['-3deg', '0deg', '3deg']
              })
            }]
          }]}>
          {this.renderCard()}
        </Animated.View>
      </View>
    );
  }
};

export default Card;
