import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import {
  BackButton,
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
  CountryCodePicker,
} from "@components";
import { widthPercentageToDP as wp, Validator } from "@helpers";
import styles, { height } from "./signup-phone-number.style.js";

const SignupPhoneNumber: () => React$Node = props => {
  const [marginTop, setMarginTop] = useState((height / 100) * 18);
  const [phoneCode, setPhoneCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setPhoneNumber: setPhoneNumberAction } = props;

  const goBack = () => {
    props.navigation.goBack();
  };
  const registerAccount = () => {
    props.requestRegistration();
  };

  useEffect(() => {
    setPhoneNumberAction(`+${phoneCode} ${phoneNumber}`);
  }, [phoneCode, phoneNumber, setPhoneNumberAction]);

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ProgressBar width={100} />
        <BackButton onPress={goBack} disabled={props.isRegistring} />
        <View
          style={styles.contentContainer}
          onLayout={e => {
            console.log(e.nativeEvent.layout.height);
            if (e.nativeEvent.layout.height < (height / 100) * 18 + wp(170)) {
              setMarginTop(15);
            } else {
              setMarginTop((height / 100) * 18);
            }
          }}
        >
          <View style={styles.informationContainer}>
            <View style={styles.instructionContainer}>
              <Text
                style={styles.instructionText}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.5}
              >
                We need your phone number solely for the login.{"\n"}
                Your number won't be visible for others.
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

          <Text
            style={[styles.titleText, { marginTop: marginTop }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
          >
            What is your phone number?
          </Text>
        </View>

        <View style={styles.footer}>
          <GradientButton
            loading={props.isRegistring}
            disabled={!Validator.isValidPhone(phoneNumber, countryCode)}
            onPress={registerAccount}
            text={"Create Account"}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default SignupPhoneNumber;
