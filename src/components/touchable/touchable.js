import React, { Component } from "react";
import { Platform, TouchableOpacity, TouchableNativeFeedback } from "react-native";

class Touchable extends Component {
  render() {
    var { children, native } = this.props;

    if (native && Platform.OS === "android") {
      return (
        <TouchableNativeFeedback {...this.props}>{children}</TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity activeOpacity={0.8} underlayColor={"transparent"} {...this.props}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default Touchable;
