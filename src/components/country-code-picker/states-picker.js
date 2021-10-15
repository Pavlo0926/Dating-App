import React, { useState, useEffect } from "react";
import { View, ScrollView, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Touchable } from "../touchable";
import { Text } from "../text";

import styles from "./states-picker.style";

const states = require("./states.json");

const StatesPicker: () => React$Node = props => {
  const [showPicker, setShowPicker] = useState(false);
  const [usState, setUsState] = useState(props.usState);
  let visibility = new Animated.Value(0);
  const {
    spacerStyle=styles.spacer,
    arrowIcon=false,
  } = props;

  useEffect(() => {
    Animated.timing(visibility, {
      toValue: showPicker ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [usState, showPicker]);

  useEffect(() => {
    !props.noFirst && props.onChange && props.onChange(usState);
  }, [usState, props]);

  return (
    <View style={styles.container}>
      <Touchable
        style={[styles.currentItem, props.style]}
        onPress={() => {
          console.log(showPicker);
          setShowPicker(!showPicker);
        }}
      >
        <Text style={[styles.itemText, arrowIcon && styles.itemTextPadding]} numberOfLines={1}>{usState.name}</Text>
        {arrowIcon && <View style={styles.arrowDown}/>}
      </Touchable>
      {showPicker && (
        <Animated.View
          style={[
            styles.contentContainer,
            props.contentContainerStyle,
            {
              opacity: visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  scale: visibility.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={spacerStyle} />
          <ScrollView>
            {states.map(item => {
              return (
                <Touchable
                  key={item.name}
                  style={styles.itemContainer}
                  onPress={() => {
                    setUsState(item);
                    setShowPicker(false);
                    props.noFirst && props.onChange && props.onChange(item);
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </Touchable>
              );
            })}
          </ScrollView>
          <LinearGradient
            colors={["rgba(171, 167, 213, 1)", "rgba(171, 167, 213, 0)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.bottomFade}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default StatesPicker;
