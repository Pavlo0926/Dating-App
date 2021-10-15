import React from "react";
import { Touchable } from "@components";
import FastImage from "react-native-fast-image";
import styles from "./avatar.style";

const Avatar: () => React$Node = props => {
  const {
    currentMessage: { user },
  } = props;
  return (
    <Touchable onPress={props.onPress} disabled={user._id === 0}>
      <FastImage
        style={styles.avatar}
        source={
          user.avatar === null || user.avatar === undefined
            ? require("@assets/images/message-image.png")
            : typeof user.avatar === "string"
            ? { uri: user.avatar }
            : user.avatar
        }
      />
    </Touchable>
  );
};

export default Avatar;
