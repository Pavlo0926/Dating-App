import React from "react";
import { Image as RNImage } from "react-native";

const Image: () => React$Node = props => {
  return <RNImage {...props} />;
};

export default Image;
