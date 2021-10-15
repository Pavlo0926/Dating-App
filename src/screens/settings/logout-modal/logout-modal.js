import React, { useState } from "react";
import { View } from "react-native";
import { Screen, Touchable, BlurView, Text, Image, BoxShadow } from "@components";
import Modal from "react-native-modal";
import Images from "@assets/Images";
import styles from "./logout-modal.style";

const LogoutModal: () => React$Node = props => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const shadowOption = {
    width: width,
    height: height,
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
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={props.onCancel}>
          <BlurView />
        </Touchable>
      }
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      backdropTransitionOutTiming={0}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      swipeDirection={"down"}
      onSwipeComplete={props.onCancel}
    >
      <View
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <BoxShadow setting={shadowOption} />
        <Screen hasGradient style={styles.container}>
          <Text style={styles.questionText}>Log Out?</Text>

          <View style={styles.separator} />

          <Touchable style={styles.buttonContainer} onPress={props.onLogout}>
            <Image source={Images.settings.icLogout} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </Touchable>

          <View style={styles.separator} />

          <Touchable style={styles.buttonContainer} onPress={props.onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Touchable>
        </Screen>
      </View>
    </Modal>
  );
};

export default LogoutModal;
