import React from "react";
import { BlurView as RNBlurView } from "@react-native-community/blur";

import styles from "./blur-view.style";

const BlurView: () => React$Node = props => {
  return (
    <RNBlurView
      style={styles.flexFill}
      blurType={props.blurType ? props.blurType : "dark"}
      blurAmount={props.blurAmount ? props.blurAmount : 10}
    />
  );
};

export default BlurView;
