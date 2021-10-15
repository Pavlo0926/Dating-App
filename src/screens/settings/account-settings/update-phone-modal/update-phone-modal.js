import React, { useState } from "react";
import { View } from "react-native";
import {
  GradientButton,
  Screen,
  BlurView,
  Touchable,
  BackButton,
  TextInput,
  Text,
  CountryCodePicker,
} from "@components";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { Validator } from "@helpers";

import styles from "./update-phone-modal.style";

const UpdatePhoneModal: () => React$Node = props => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const onUpdatePhone = () => {
    let phone = `+${phoneCode} ${phoneNumber}`;
    props.updatePhoneNumber(phone);
    props.onSwipeComplete();
  };

  const onModalWillShow = () => {
    setPhoneNumber("");
  };

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={props.onSwipeComplete}>
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='#0B0516'
          />
        </Touchable>
      }
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      backdropTransitionOutTiming={0}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      swipeDirection={"down"}
      onSwipeComplete={props.onSwipeComplete}
      onModalWillShow={onModalWillShow}
    >
      <View>
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.backgroundView}
        />
        <View style={styles.header}>
          <BackButton onPress={props.onSwipeComplete} />
        </View>

        <View style={styles.phoneContainer}>
          <View>
            <View style={styles.phoneCodeContainer}>
              <CountryCodePicker
                country={{ iso2: "us", dialCode: "1" }}
                onChange={country => {
                  setPhoneCode(country.dialCode);
                  setCountryCode(country.iso2);
                }}
              />
            </View>
            <Text style={styles.phoneLabel}>PHONE CODE</Text>
          </View>

          <View style={styles.phoneNumberContainer}>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={"New Phone Number"}
              keyboardType={"phone-pad"}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            disabled={!Validator.isValidPhone(phoneNumber, countryCode)}
            containerStyle={styles.button}
            text={"Save"}
            textStyle={styles.buttonText}
            onPress={onUpdatePhone}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UpdatePhoneModal;
