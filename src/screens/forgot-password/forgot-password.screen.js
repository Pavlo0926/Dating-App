import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import {
  BackButton,
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
  CountryCodePicker,
} from "@components";
import { SCREENS } from "@constants";
import { Validator } from "@helpers";
import styles from "./forgot-password.style.js";

const SignupPhoneNumber: () => React$Node = props => {
  const [phoneCode, setPhoneCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const goBack = () => {
    props.navigation.goBack();
  };

  const sendCode = () => {
    props.requestCheckPhone(
      `+${phoneCode} ${phoneNumber}`,
      SCREENS.RESET_PASSWORD_CODE_VERIFICATION,
    );
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ProgressBar width={50} />
        <BackButton onPress={goBack} />
        <View style={styles.contentContainer} pointerEvents={"box-none"}>
          <View style={styles.informationContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                We will send you a code to your phone number. Enter the code on the next
                page to set a new password
              </Text>
            </View>
          </View>

          <View style={styles.phoneContainer}>
            <View style={styles.phoneCodeContainer}>
              <Text style={styles.phoneLabel}>PHONE CODE</Text>
              <CountryCodePicker
                country={{ iso2: "us", dialCode: "1" }}
                onChange={country => {
                  setPhoneCode(country.dialCode);
                  setCountryCode(country.iso2);
                }}
                style={styles.codePicker}
              />
            </View>
            <View style={styles.phoneSeparator} />
            <View style={styles.phoneNumberContainer}>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder={"Your phone number"}
                keyboardType={"phone-pad"}
              />
            </View>
          </View>

          <Text style={styles.titleText}>Forgot Password?</Text>
        </View>

        <View style={styles.footer}>
          <GradientButton
            loading={props.isCheckingPhone}
            disabled={!Validator.isValidPhone(phoneNumber, countryCode)}
            onPress={sendCode}
            text={"Send code"}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default SignupPhoneNumber;
