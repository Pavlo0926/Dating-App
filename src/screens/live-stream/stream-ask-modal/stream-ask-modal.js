import React, { useState } from "react";
import { View } from "react-native";
import { Screen, BackButton, Text, Image, BoxShadow, GradientButton } from "@components";
import Modal from "react-native-modal";
import Images from "@assets/Images";

import styles from "./stream-ask-modal.style";

const StreamAskModal: () => React$Node = props => {
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

  const title = !props.isAskedToJoin ? "Ask to join" : "Waiting to join...";
  const message = !props.isAskedToJoin
    ? "Ask the streamers to join live."
    : "Streamers have to accept your invitation before you can join.";
  const buttonText = !props.isAskedToJoin ? "Raise your hand" : "Cancel request";

  const requestAskToJoin = () => {
    const { isAskedToJoin, streamParams, token } = props;
    if (isAskedToJoin) {
      props.onBack();
      props.setAskedToJoin(false);
      props.requestUserCancelAsk(streamParams.channelName, token);
    } else {
      props.onBack();
      props.setAskedToJoin(true);
      props.requestUserAskJoin(streamParams.channelName, token);
    }
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
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.messageText} numberOfLines={2}>
            {message}
          </Text>
          <View style={styles.buttonContainer}>
            <GradientButton onPress={() => requestAskToJoin()} text={buttonText} />
          </View>
        </Screen>
        <View style={styles.logoContainer}>
          <BoxShadow setting={handShadowOpt} />
          <View style={styles.logoIconContainer}>
            <Image source={Images.live.icHand} style={styles.logoIcon} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StreamAskModal;
