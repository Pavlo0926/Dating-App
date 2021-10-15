import React from "react";
import { View } from "react-native";
import { Touchable, Image, Text } from "@components";

import styles from "./right-element.style";

const RightElement: () => React$Node = props => {
  return props.isSearchActive ? (
    <Touchable onPress={props.onSearchPress}>
      <Text style={styles.cancelText}>Cancel</Text>
    </Touchable>
  ) : (
    <View style={styles.container}>
      <Touchable style={styles.headerButtonTouchable} onPress={props.onSearchPress}>
        <Image source={require("@assets/images/live-screen/live-search.png")} />
      </Touchable>
      <Touchable style={styles.headerButtonTouchable} onPress={props.onFilterPress}>
        <Image source={require("@assets/images/live-screen/live-setting.png")} />
      </Touchable>
    </View>
  );
};

export default RightElement;
