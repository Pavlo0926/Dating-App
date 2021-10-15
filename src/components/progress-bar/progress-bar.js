import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./progress-bar.style";

const ProgressBar: () => React$Node = props => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#02FFF3", "#617FFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientFill, { width: props.width + "%" }]}
      />
      <View style={styles.separator} />
      <View style={styles.remainingFill} />
    </View>
  );
};

ProgressBar.defaultProps = {
  width: 20,
};

export default ProgressBar;
