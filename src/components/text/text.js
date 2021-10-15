import React, { Component } from "react";
import { StyleSheet, Text as NativeText } from "react-native";
import ScaleSheet from "react-native-scalesheet";
import { FontHelper } from "@helpers";

class Text extends Component {
  render() {
    const { style, scale, link, children, ...rest } = this.props;
    let propsStyle;

    if (style instanceof Array) {
      propsStyle = FontHelper.font(StyleSheet.flatten(style));
    } else {
      propsStyle = FontHelper.font(style || {});
    }

    const defaultStyle = { color: link ? "blue" : "black" };
    const sheet = scale ? ScaleSheet : StyleSheet;
    const styles = sheet.create({
      text: {
        ...defaultStyle,
        ...propsStyle,
      },
    });

    return (
      <NativeText {...rest} style={styles.text} allowFontScaling={false}>
        {children}
      </NativeText>
    );
  }
}

export { Text };
