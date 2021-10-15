import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { BackButton, BorderButton, Screen, Text, Touchable } from "@components";
import { SCREENS } from "@constants";
import LoginForm from "./login.form";
import styles from "./login.style.js";

const LoginScreen: () => React$Node = props => {
  const goBack = () => {
    props.navigation.goBack();
  };

  const navigateToPhoneLogin = () => {
    props.navigation.navigate(SCREENS.LOGIN_PHONE_NUMBER);
  };

  const onLogin = values => {
    props.login(values);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackButton onPress={goBack} />
        <View style={styles.centeredContentContainer} pointerEvents={"box-none"}>
          <Text style={styles.titleText}>Login</Text>
          <LoginForm isLoggingIn={props.isLoggingIn} onSubmit={onLogin} />
          <Text style={styles.orText}>OR</Text>

          <BorderButton onPress={navigateToPhoneLogin} text={"Login with phone number"} />

          <Touchable
            onPress={() => {
              props.navigation.navigate(SCREENS.FORGOT_PASSWORD, {});
            }}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Touchable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default LoginScreen;
