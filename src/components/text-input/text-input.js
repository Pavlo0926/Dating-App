import React, { useState } from "react";
import { TextInput as RNTextInput, View } from "react-native";
import { BoxShadow } from "../shadow";
import styles from "./text-input.style.js";

const TextInput: () => React$Node = props => {
  const [width, setWidth] = useState(1);

  return (
    <View style={styles.container}>
      <BoxShadow
        setting={{
          width: width,
          height: 35,
          color: "#FFFFFF",
          opacity: 0.25,
          _borderRadius: 18,
          spread: 0,
          blur: 20,
          offsetX: 0,
          offsetY: 0,
        }}
      />
      <RNTextInput
        {...props}
        autoCorrect={false}
        allowFontScaling={false}
        underlineColorAndroid='transparent'
        style={[styles.inputField]}
        onLayout={e => {
          const { layout } = e.nativeEvent;
          setWidth(layout.width);
        }}
        placeholderTextColor={"#9892A3"}
      />
    </View>
  );
};

export default TextInput;
