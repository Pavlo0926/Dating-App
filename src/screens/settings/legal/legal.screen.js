import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import { SCREENS } from "@constants";
import Images from "@assets/Images";

import Header from "../header";
import styles from "./legal.style";

const LegalScreen: () => React$Node = props => {

  const renderItem = (title, text, hint) => {
    return (
      <View style={styles.itemPadding}>
        <View style={styles.flexRow}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.valueText}>{text}</Text>
          <Image source={Images.app.icRight} style={styles.arrowIcon} />
        </View>
        {hint !== null && <Text style={styles.hintText}>{hint}</Text>}
      </View>
    );
  };

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={"Legal"} onBack={props.navigation.goBack} />

          <Touchable onPress={() => props.navigation.navigate(SCREENS.TERMS_OF_SERVICE, {content: "Privacy"})}>
            {renderItem("Privacy Policy", "", null)}
          </Touchable>
          <View style={styles.seperator} />
          <Touchable onPress={() => props.navigation.navigate(SCREENS.TERMS_OF_SERVICE, {})}>
            {renderItem("Terms of Service", "", null)}
          </Touchable>
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default LegalScreen;
