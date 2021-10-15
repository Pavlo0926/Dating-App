import React from "react";
import { SafeAreaView, View } from "react-native";
import { Screen, Text, Touchable } from "@components";
import { SCREENS } from "@constants";

import Header from "../header";
import styles from "./help.style";

const HelpScreen: () => React$Node = props => {

  const helpButtons = ["I have a question", "I found a bug", "I'd like to report a Safety Concern", "I have a suggestion"];

  const onHelp = (index) => {
    props.navigation.navigate(SCREENS.HELP_CONTENT, {type: index + 1, 
      onGoBack: () => {
        props.navigation.goBack();
      }
    });
  }

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={"Help"} onBack={props.navigation.goBack} />

          <View style={styles.contentContainer}>
            {helpButtons.map((button, index) => {
              return (
                <Touchable style={styles.buttonContainer} key={`help-button-${index}`}
                  onPress={() => onHelp(index)}>
                  <Text style={styles.buttonText}>{button}</Text>
                </Touchable>
              )
            })}
          </View>
          
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default HelpScreen;
