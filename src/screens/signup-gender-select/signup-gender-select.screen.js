import React from "react";
import { Image, View } from "react-native";
import {
  GradientButton,
  ProgressBar,
  Screen,
  SolidButton,
  Text,
  Touchable,
} from "@components";
import styles from "./signup-gender-select.style.js";

const SignupGenderSelect: () => React$Node = props => {
  const goBack = () => {
    props.navigation.goBack();
  };
  const navigateNext = () => {
    props.setLikeGender("both");
    props.navigation.navigate("SIGNUP_USERNAME", {});
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar width={50} />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>What is your gender?</Text>

          <View style={styles.selectionContainer}>
            <View style={styles.buttonContainer}>
              {props.gender === "male" ? (
                <GradientButton onPress={() => props.setGender("male")} text={"Male"} />
              ) : (
                <SolidButton onPress={() => props.setGender("male")} text={"Male"} />
              )}
            </View>

            <View style={styles.buttonSeparator} />

            <View style={styles.buttonContainer}>
              {props.gender === "female" ? (
                <GradientButton
                  onPress={() => props.setGender("female")}
                  text={"Female"}
                />
              ) : (
                <SolidButton onPress={() => props.setGender("female")} text={"Female"} />
              )}
            </View>
          </View>

          {/* <Text style={[styles.titleText, styles.titleTop]}>I'm looking to meet...</Text>

          <View style={styles.selectionContainer}>
            <View style={styles.buttonContainer}>
              {props.likeGender === "male" || props.likeGender === "both" ? (
                <GradientButton
                  onPress={() => {
                    if (props.likeGender === "both") {
                      props.setLikeGender("female");
                    } else {
                      props.setLikeGender(null);
                    }
                  }}
                  text={"Male"}
                />
              ) : (
                <SolidButton
                  onPress={() => {
                    if (props.likeGender === "female") {
                      props.setLikeGender("both");
                    } else {
                      props.setLikeGender("male");
                    }
                  }}
                  text={"Male"}
                />
              )}
            </View>

            <View style={styles.buttonSeparator} />

            <View style={styles.buttonContainer}>
              {props.likeGender === "female" || props.likeGender === "both" ? (
                <GradientButton
                  onPress={() => {
                    if (props.likeGender === "both") {
                      props.setLikeGender("male");
                    } else {
                      props.setLikeGender(null);
                    }
                  }}
                  text={"Female"}
                />
              ) : (
                <SolidButton
                  onPress={() => {
                    if (props.likeGender === "male") {
                      props.setLikeGender("both");
                    } else {
                      props.setLikeGender("female");
                    }
                  }}
                  text={"Female"}
                />
              )}
            </View>
          </View> */}
        </View>

        <View style={styles.footer}>
          <GradientButton
            // disabled={!props.gender || !props.likeGender}
            disabled={!props.gender}
            onPress={navigateNext}
            text={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SignupGenderSelect;
