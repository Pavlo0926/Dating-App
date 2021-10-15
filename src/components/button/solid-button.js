import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import { BoxShadow } from "../shadow";
import styles from "./solid-button.style";

class WhiteButton extends Component {
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
      containerStyle,
      textStyle,
      shadowColor = "#FFFFFF",
      loadingColor = "white",
      noShadow,
    } = this.props;
    const { width, height, radius, blur } = this.state;

    return (
      <Touchable disabled={disabled} onPress={onPress}>
        {!noShadow &&
        <BoxShadow
          setting={{
            width: width,
            height: height,
            color: shadowColor,
            opacity: 0.25,
            _borderRadius: radius,
            spread: 0,
            blur: blur,
            offsetX: 0,
            offsetY: 0,
          }}
        />}
        <View
          style={[styles.container, containerStyle]}
          onLayout={e => {
            const { layout } = e.nativeEvent;
            this.setState({
              width: layout.width,
              height: layout.height,
              radius: layout.height / 2,
              blur: 20,
            });
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={loadingColor} />
          ) : (
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
          )}
        </View>
      </Touchable>
    );
  }
}

export default WhiteButton;
