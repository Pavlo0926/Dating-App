import React from "react";
import { View } from "react-native";
import { ModalHeader, GradientButton, SolidButton, Screen, Touchable } from "@components";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";

import styles from "./gender-modal.style";

const GenderModal: () => React$Node = props => {
  const onChangeGender = value => {
    props.onChange(value);
  };

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={() => props.onDismiss()}>
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='#0B0516'
          />
        </Touchable>
      }
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropTransitionOutTiming={0}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      swipeDirection={["down"]}
      onSwipeComplete={() => props.onDismiss()}
    >
      <Screen hasGradient style={styles.container}>
        <ModalHeader title={"Show me"} onDismiss={props.onDismiss} />

        <View style={styles.spacer} />

        <View style={styles.buttonContainer}>
          {props.gender === 1 ? (
            <GradientButton onPress={() => onChangeGender(1)} text={"Male"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(1)} text={"Male"} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {props.gender === 2 ? (
            <GradientButton onPress={() => onChangeGender(2)} text={"Female"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(2)} text={"Female"} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {props.gender === 0 ? (
            <GradientButton onPress={() => onChangeGender(0)} text={"Both"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(0)} text={"Both"} />
          )}
        </View>
        <View style={styles.spacer} />
        <View style={styles.spacer} />
      </Screen>
    </Modal>
  );
};

export default GenderModal;
