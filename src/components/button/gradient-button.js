import React, { Component, Fragment } from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "../text";
import { Image } from "../image";
import { Touchable } from "../touchable";
import { BoxShadow } from "../shadow";
import styles from "./gradient-button.style";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

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

  renderContent = () => {
    var {
      text,
      disabled,
      disabledButton=true,
      loading,
      colors,
      containerStyle,
      textStyle,
      icon,
      iconStyle,
      shadowColor = "#1900FF",
      noShadow,
    } = this.props;
    const { width, height, radius, blur } = this.state;

    return (
      <View>
        {!disabled && !noShadow && (
          <BoxShadow
            setting={{
              width: width,
              height: height,
              color: shadowColor,
              opacity: 0.38,
              _borderRadius: radius,
              spread: 0,
              blur: blur,
              offsetX: 0,
              offsetY: 0,
            }}
          />
        )}
        <LinearGradient
          colors={colors}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[
            styles.container,
            containerStyle,
            (disabled && disabledButton) ? styles.buttonDisabled : {},
          ]}
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
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Fragment>
              {icon && <Image source={icon} style={iconStyle} />}
              {text && text !== "" &&
                <Text
                  style={[
                    styles.buttonText,
                    textStyle,
                    (disabled && disabledButton) ? styles.buttonTextDisabled : {},
                  ]}
                >
                  {text}
                </Text>}
            </Fragment>
          )}
        </LinearGradient>
      </View>
    );
  };

  render() {
    var { onPress, disabled, loading, noButton } = this.props;

    if (noButton) {
      return this.renderContent();
    }

    return (
      <Touchable disabled={loading || disabled} onPress={onPress}>
        {this.renderContent()}
      </Touchable>
    );
  }
}

GradientButton.defaultProps = {
  colors: GRADIENT.BUTTON,
};

export default GradientButton;
