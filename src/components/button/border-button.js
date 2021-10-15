import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import { BoxShadow } from "../shadow";
import styles from "./border-button.style";

class GradientButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      radius: 0,
      blur: 1,
    };
  }

  render() {
    var {
      onPress,
      text,
      disabled,
      loading,
      color,
      textStyle,
      shadowColor = "#1900FF",
    } = this.props;
    const { width, height, radius, blur } = this.state;

    return (
      <Touchable disabled={disabled} onPress={onPress}>
        <BoxShadow
          setting={{
            width: width,
            height: height,
            color: shadowColor,
            opacity: 0.1,
            _borderRadius: radius,
            spread: 5,
            blur: blur,
            offsetX: 0,
            offsetY: 0,
          }}
        />
        <View
          style={[styles.container, color === undefined ? {} : { borderColor: color }]}
          onLayout={e => {
            const { layout } = e.nativeEvent;
            this.setState({
              width: layout.width,
              height: layout.height,
              radius: layout.height / 2,
              blur: 10,
            });
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={[styles.buttonText, textStyle === undefined ? {} : textStyle]}>
              {text}
            </Text>
          )}
        </View>
      </Touchable>
    );
  }
}

export default GradientButton;
