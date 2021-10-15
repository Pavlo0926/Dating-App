import React, { useState } from "react";
import { View } from "react-native";
import { Screen } from "../screen";
import { Text } from "../text";
import { Image } from "../image";
import { BoxShadow } from "../shadow";
import { GradientButton, AnimatedButton } from "../button";
import Modal from "react-native-modal";
import Images from "@assets/Images";

import styles from "./boost-confirm-modal.style";

const BoostConfirmModal: () => React$Node = props => {
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

  const {...rest } = props;

  return (
    <Modal
      {...rest}
      onBackdropPress={props.onBack}
      backdropOpacity={0.5}
      useNativeDriver={false}
      style={styles.modalContainer}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      swipeDirection={"down"}
      onSwipeComplete={props.onBack}
    >
      <View
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <BoxShadow setting={backShadowOpt} />
        <Screen hasGradient style={styles.modalContainer}>
          <Text style={styles.titleText}>
            {props.title}
          </Text>
          <Text style={styles.messageText}>
            {props.content}
          </Text>
          <View style={styles.buttonContainer}>
            <AnimatedButton
              text={"Boost now"}
              onPress={props.onBoost} />
          </View>
          <View style={[styles.closeButton]}>
            <GradientButton
              colors={["#312446", "#312446"]}
              noShadow
              text={"Close"}
              onPress={props.onBack}/>
          </View>
        </Screen>
        <View style={styles.logoContainer}>
          <Image source={Images.swipe.boostLogoCenter} style={styles.logoIcon} />
        </View>
      </View>
    </Modal>
  );
};

export default BoostConfirmModal;
