import React, { useState, useEffect } from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import {
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
  Touchable,
} from "@components";
import { getCurrentLocation } from "@helpers";
import { widthPercentageToDP as wp } from "@helpers";
import styles, { height } from "./signup-first-name.style.js";

const SignupFirstName: () => React$Node = props => {
  const { updateLocation } = props;
  const [marginTop, setMarginTop] = useState((height / 100) * 18);
  const goBack = () => {
    props.navigation.goBack();
  };
  const navigateNext = () => {
    props.navigation.navigate("SIGNUP_BIRTH_DATE", {});
  };

  useEffect(() => {
    getCurrentLocation(position => {
      updateLocation(position);
    });
  }, [updateLocation]);

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ProgressBar width={18} />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <View
            style={styles.titleFieldContainer}
            onLayout={e => {
              if (e.nativeEvent.layout.height < (height / 100) * 18 + wp(130)) {
                setMarginTop(20);
              } else {
                setMarginTop((height / 100) * 18);
              }
            }}
          >
            <Text style={[styles.titleText, { marginTop: marginTop }]}>
              What's your first name?
            </Text>

            <TextInput
              value={props.firstName}
              onChangeText={text => {
                props.setFirstName(text);
              }}
              placeholder={"First name"}
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton
              disabled={!props.firstName}
              onPress={navigateNext}
              text={"Continue"}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default SignupFirstName;
