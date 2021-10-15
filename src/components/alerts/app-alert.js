import React, { useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { BoxShadow } from "../shadow";
import { Text } from "../text";
import { GradientButton } from "../button";
import { Screen } from "../screen";

import styles, { shadowOption } from "./app-alert.style";

const AppAlert: () => React$Node = props => {
  const [contentWidth, setContentWidth] = useState(1);
  const [contentHeight, setContentHeight] = useState(100);
  const shadowOption = {
    width: contentWidth,
    height: contentHeight,
    color: "#0B0516",
    opacity: 1,
    _borderRadius: 22,
    spread: 0,
    blur: 20,
    offsetX: 0,
    offsetY: 6,
  };

  return (
    <Modal
        isVisible={props.isVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        useNativeDriver={false}
        propagateSwipe={true}
        style={styles.modalContainer}
        swipeDirection={"down"}
        onSwipeComplete={props.onDismiss}
        swipeThreshold={30}
      >
      <View
        onLayout={(e) => {
          setContentWidth(e.nativeEvent.layout.width);
          setContentHeight(e.nativeEvent.layout.height);
      }}>
        <BoxShadow setting={shadowOption} />
        <Screen hasGradient style={styles.container} >
          <Text style={styles.titleText}>
            {props.title}
          </Text>
          <Text style={styles.contentText}>
            {props.content}
          </Text>
          <View style={styles.buttonContainer}>
            <GradientButton 
              text={"Okay"}
              textStyle={styles.buttonText}
              containerStyle={styles.buttonStyle}
              onPress={props.onDismiss} />
          </View>
        </Screen>
      </View>
    </Modal>
  );
};

export default AppAlert;
