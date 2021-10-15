import React from "react";
import { View } from "react-native";
import { Touchable } from "../touchable";
import LinearGradient from "react-native-linear-gradient";
import styles from "./card-progress-bar.style";

const CardProgressBar: () => React$Node = props => {
  const { count, activeIndex } = props;
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(i);
  }
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        if (props.onPress) {
          if (activeIndex === count - 1) {
            props.onPress(0);
          } else {
            props.onPress(activeIndex + 1);
          }
        }
      }}
    >
      <View style={styles.contentContainer}>
        {arr.map((value, index) => {
          if (index === activeIndex) {
            return (
              <View
                key={index}
                style={[styles.gradientFill, { width: 100 / props.count + "%" }]}
              >
                <LinearGradient
                  colors={["#617FFF", "#02FFF3"]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.flexFill}
                />
                <View style={styles.separator} />
              </View>
            );
          } else {
            return (
              <View
                key={index}
                style={[styles.gradientFill, { width: 100 / props.count + "%" }]}
              >
                <View style={styles.remainingFill} />
                <View style={styles.separator} />
              </View>
            );
          }
        })}
      </View>
    </Touchable>
  );
};

CardProgressBar.defaultProps = {
  count: 2,
  activeIndex: 0,
};

export default CardProgressBar;
