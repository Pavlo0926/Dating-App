import React, { useState } from "react";
import { View } from "react-native";
import { Screen, Text, BoxShadow, GradientButton } from "@components";
import Modal from "react-native-modal";

import styles from "./stream-end-modal.style";

const StreamEndModal: () => React$Node = props => {
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

  return (
    <Modal
      {...props}
      backdropOpacity={0.5}
      useNativeDriver={false}
      style={styles.modalContainer}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <View
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <BoxShadow setting={backShadowOpt} />
        <Screen hasGradient style={styles.modalContainer}>
          <Text style={styles.titleText}>{"Live has ended."}</Text>
          <View style={styles.buttonContainer}>
            <GradientButton onPress={() => props.onLeaveRoom()} text={"Okay"} />
          </View>
        </Screen>
      </View>
    </Modal>
  );
};

export default StreamEndModal;
