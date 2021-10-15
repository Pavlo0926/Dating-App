import React, { Component } from "react";
import { View } from "react-native";
import GradientButton from "./gradient-button";
import { Image } from "../image";
import * as Animatable from "react-native-animatable";
import Images from "@assets/Images";
import styles from "./animated-button.style";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

const AnimatedButton: () => React$Node = props => {
  const {
    colors=["#9C3DE2", "#D491FF"],
    shadowColor="#6E00FF",
    text="Boost me",
    icon,
    animImage=Images.app.boostBubbles,
    animCotainerStyle=styles.animContainer,
    loading=false
  } = props;

  return (
    <View style={styles.container}>
      <GradientButton
        colors={colors}
        shadowColor={shadowColor}
        text={text}
        icon={icon ? icon : null}
        containerStyle={props.containerStyle}
        iconStyle={props.iconStyle}
        onPress={props.onPress}
        loading={loading}
      />
      <AnimatableView
        animation={{
          from: {["translateY"]: -2.5},
          to: {["translateY"]: 2.5}
        }}
        iterationCount={"infinite"}
        direction="alternate"
        duration={1500}
        style={animCotainerStyle}
        pointerEvents={"none"}>
        <Image
          source={animImage}
          pointerEvents={"none"}
          style={styles.animImage}
        />
      </AnimatableView>
    </View>
  );
}

export default AnimatedButton;