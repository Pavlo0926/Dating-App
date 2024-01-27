import React from "react";
import { View } from "react-native";
import { Image } from "../image";
import { Touchable } from "../touchable";
import styles from "./back-button.style";

const BackButton: () => React$Node = props => {
  return (
    <Touchable disabled={props.disabled} onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          source={
            props.icon === undefined
              ? require("@assets/images/chevron-left.png")
              : props.icon
          }
          resizeMode={"contain"}
          style={styles.iconSize}
        />
      </View>
    </Touchable>
  );
};

export default BackButton;
