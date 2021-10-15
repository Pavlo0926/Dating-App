import React, { useState } from "react";
import { Image, View } from "react-native";
import {
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
  Touchable,
} from "@components";
import styles from "./reset-password.style.js";
function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}
function hasNumber(str) {
  return /[0-9]/.test(str);
}

const ResetPassword: () => React$Node = props => {
  const { phoneNumber, passwordResetToken } = props.navigation.state.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const goBack = () => {
    props.navigation.goBack();
  };
  const submit = () => {
    props.requestResetPassword(phoneNumber, passwordResetToken, password);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer} pointerEvents={"box-none"}>
          <Text style={styles.titleText} numberOfLines={1} adjustsFontSizeToFit={true}>
            Set your new password.
          </Text>

          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder={"Password"}
            secureTextEntry
          />

          <View style={styles.inputFieldSeparator} />

          <TextInput
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeholder={"Enter your password again"}
            secureTextEntry
          />

          <View style={styles.informationContainer}>
            <Text style={styles.passwordRequirementTitle}>Password requires</Text>

            <View style={styles.instructionContainer}>
              <View
                style={
                  password.length >= 8
                    ? styles.instructionValidIcon
                    : styles.instructionInvalidIcon
                }
              />
              <Text style={styles.passwordRequirement}>Have at least 8 characters</Text>
            </View>
            <View style={styles.instructionContainer}>
              <View
                style={
                  hasUpperCase(password)
                    ? styles.instructionValidIcon
                    : styles.instructionInvalidIcon
                }
              />
              <Text style={styles.passwordRequirement}>
                Have at least one capital letter
              </Text>
            </View>
            <View style={styles.instructionContainer}>
              <View
                style={
                  hasNumber(password)
                    ? styles.instructionValidIcon
                    : styles.instructionInvalidIcon
                }
              />
              <Text style={styles.passwordRequirement}>Have at least one number</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            loading={props.isResettingPassword}
            disabled={
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              password.length < 8 ||
              !hasUpperCase(password) ||
              !hasNumber(password)
            }
            onPress={submit}
            text={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ResetPassword;
