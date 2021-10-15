import React from "react";
import { ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import styles from "./screen.style";

const Screen: () => React$Node = props => {
  const ContainerComponent = props.hasHeader ? View : SafeAreaView;

  return props.hasGradient ? (
    <LinearGradient
      colors={GRADIENT.SCREEN_BACKGROUND}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={props.style}
    >
      {props.children}
    </LinearGradient>
  ) : (
    <ImageBackground
      source={require("@assets/images/bg.png")}
      style={styles.imageBackground}
    >
      <ContainerComponent style={[styles.container, props.style]}>
        {props.children}
      </ContainerComponent>
    </ImageBackground>
  );
};

export { Screen };
