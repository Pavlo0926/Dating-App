import React, { useState } from "react";
import { View } from "react-native";
import {
  Screen,
  BackButton,
  Text,
  BoxShadow,
  GradientButton,
  SolidButton,
} from "@components";
import Modal from "react-native-modal";

import styles from "./stream-stop-modal.style";

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
          <Text style={styles.titleText}>{"Stop broadcasting?"}</Text>
          <Text style={styles.messageText}>
            {"Are you sure you want to leave the room?"}
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <GradientButton onPress={() => props.onBack()} text={"Cancel"} />
            </View>
            <View style={[styles.button, styles.buttonMargin]}>
              <SolidButton
                containerStyle={styles.leaveButton}
                textStyle={styles.leaveText}
                shadowColor={"#000"}
                onPress={() => props.onLeaveRoom()}
                text={"Leave"}
              />
            </View>
          </View>
        </Screen>
      </View>
    </Modal>
  );
};

export default StreamEndModal;
