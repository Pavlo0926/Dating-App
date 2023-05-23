import React from "react";
import { Image, View } from "react-native";
import { GradientButton, ProgressBar, Screen, Text } from "@components";
import styles from "./signup-success.style.js";

const SignupSuccess: () => React$Node = props => {
  const { user } = props.navigation.state.params;

  const submit = () => {
    props.loginSuccess(user);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar width={100} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Congratulations!</Text>
          <Text style={styles.subTitleText}>
            You've verified your account and can now use it.
          </Text>

          <View style={styles.successIconContainer}>
            <Image source={require("@assets/images/tick.png")} />
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton onPress={submit} text={"Get into PLUZO"} />
        </View>
      </View>
    </Screen>
  );
};

export default SignupSuccess;
