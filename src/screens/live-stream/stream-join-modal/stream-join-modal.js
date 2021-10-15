import React, { useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { Screen, BackButton, Text, BoxShadow, GradientButton } from "@components";
import Modal from "react-native-modal";

import styles from "./stream-join-modal.style";

const StreamJoinModal: () => React$Node = props => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  let backShadowOpt = {
    width: width,
    height: height,
    color: "#0B0516",
    opacity: 0.5,
    _borderRadius: 20,
    spread: 0,
    blur: 20,
    offsetX: 0,
    offsetY: 6,
  };
  let handShadowOpt = {
    width: 60,
    height: 60,
    color: "#0B0516",
    opacity: 1,
    _borderRadius: 30,
    spread: 0,
    blur: 20,
    offsetX: 0,
    offsetY: 6,
  };

  const message = props.askedByUser ? "asks you to join" : "asks you to join their live";

  return (
    <Modal
      isVisible={props.isVisible}
      backdropOpacity={0.5}
      useNativeDriver={false}
      style={styles.modalContainer}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      onBackdropPress={props.onBack}
    >
      <View
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <BoxShadow setting={backShadowOpt} />
        <Screen hasGradient style={styles.modalContainer}>
          {/* <BackButton onPress={() => props.onBack()} /> */}
          <Text style={styles.titleText}>
            {props.askedUser ? props.askedUser.first_name : ""}
          </Text>
          <Text style={styles.messageText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <GradientButton onPress={() => props.onJoin()} text={"Join"} />
          </View>
        </Screen>
        <View style={styles.logoContainer}>
          <BoxShadow setting={handShadowOpt} />
          <View style={styles.logoIconContainer}>
            <FastImage
              source={{ uri: props.askedUser.images[0].path }}
              style={styles.logoIcon}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StreamJoinModal;
