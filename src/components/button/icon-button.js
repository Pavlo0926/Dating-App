import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Touchable } from "../touchable";
import { Image } from "../image";

import styles from "./icon-button.style";

class IconButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  render() {
    const {
      onPress,
      disabled,
      loading,
      backColor,
      iconWidth,
      iconHeight,
      icon,
      iconTint,
    } = this.props;
    const { width } = this.state;

    return (
      <Touchable
        style={[
          styles.container,
          {
            backgroundColor: backColor,
            borderRadius: width / 2,
          },
        ]}
        disabled={disabled}
        onPress={onPress}
        onLayout={e => {
          this.setState({ width: e.nativeEvent.layout.width });
        }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Image
            source={icon}
            style={[
              styles.buttonIcon,
              {
                width: iconWidth,
                height: iconHeight,
                tintColor: iconTint,
              },
            ]}
          />
        )}
      </Touchable>
    );
  }
}

export default IconButton;
