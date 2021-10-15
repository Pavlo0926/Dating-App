import React, { useState } from "react";
import { View } from "react-native";
import { Screen } from "../screen";
import { Text } from "../text";
import { Image } from "../image";
import { BoxShadow } from "../shadow";
import { GradientButton } from "../button";
import Modal from "react-native-modal";
import Images from "@assets/Images";

import styles from "./notification-modal.style";

const NotificationModal: () => React$Node = props => {
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

  const {
    title = "Are you sure?",
    message = "Do you really want to remove that friend?",
    buttonText = "Remove friend",
    buttonColors = ["#FF0036", "#FF0036"],
    buttonTextStyle = {color: "white"},
    buttonContainerStyle = {},
    logoBackground = "#FF0036",
    logoIcon = Images.app.icCross,
    logoTintColor = "black",
    ...rest } = props;

  const onConfirm = () => {
    const { token } = props;
    props.onConfirm(props.userId, props.userName);
  };

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
          <Text style={styles.titleText}>{title}</Text>
          {message !== "" &&
          <Text style={styles.messageText} numberOfLines={2}>
            {message}
          </Text>}
          <View style={[styles.buttonContainer, buttonContainerStyle]}>
            <GradientButton 
              colors={buttonColors}
              noShadow
              onPress={() => onConfirm()} 
              text={buttonText}
              textStyle={buttonTextStyle} />
          </View>
        </Screen>
        <View style={styles.logoContainer}>
          <View style={[styles.logoIconContainer, {backgroundColor: logoBackground}]}>
            <Image source={logoIcon} style={[styles.logoIcon, {tintColor: logoTintColor}]} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
