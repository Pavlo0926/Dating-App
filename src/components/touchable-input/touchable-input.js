import React, { Component } from "react";
import { Image, View } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import styles from "./touchable-input.style";

class TouchableInput extends Component {
  render() {
    var { disabled, placeholder, required, value, isFloatingLabel } = this.props;
    var requiredComponent = required ? <Text style={styles.required}>{" *"}</Text> : null;
    placeholder = placeholder || "";

    return (
      <Touchable disabled={disabled} onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style, disabled && styles.disabled]}>
          <View style={styles.contentContainer}>
            {value ? (
              <View style={styles.flexContainer}>
                {isFloatingLabel ? (
                  <Text style={styles.placeholderSmall}>
                    {this.props.placeholder}
                    {requiredComponent}
                  </Text>
                ) : null}
                <Text numberOfLines={1} style={[styles.value, this.props.textStyle]}>
                  {value}
                </Text>
              </View>
            ) : (
              <View style={styles.flexContainer}>
                <Text style={styles.placeholderLarge}>
                  {placeholder}
                  {requiredComponent}
                </Text>
              </View>
            )}
            {typeof this.props.icon !== "undefined" ? (
              this.props.icon
            ) : (
              <Image source={require("@assets/images/chevron.png")} />
            )}
          </View>
        </View>
      </Touchable>
    );
  }
}

TouchableInput.defaultProps = {
  isFloatingLabel: true,
};

export default TouchableInput;
