import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import { SCREENS } from "@constants";
import Images from "@assets/Images";

import Header from "../header";
import styles from "./safety-privacy.style";

const SafetyPrivacy: () => React$Node = props => {
  const { getBlockedUsers, token } = props;

  useEffect(() => {

    getBlockedUsers(token);

  }, [getBlockedUsers, token]);

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
          <Header title={"Safety & Privacty"} onBack={props.navigation.goBack} />

          <Touchable onPress={() => props.navigation.navigate(SCREENS.BLOCKED_USERS)}>
            {renderItem("Blocked Users", props.blockedUsers.length, null)}
          </Touchable>
          <View style={styles.seperator} />
          <Touchable onPress={() => props.navigation.navigate(SCREENS.LOCATION_PERMISSION)}>
            {renderItem("Location", "", "Manage the access to your location data")}
          </Touchable>
          <View style={styles.emptyRow} />
          <Touchable onPress={() => props.navigation.navigate(SCREENS.CAMERA_MIC_PERMISSION)}>
            {renderItem("Camera and microphone", "", null)}
          </Touchable>
          <View style={styles.seperator} />
          {renderItem("Personalization and data", "", null)}
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default SafetyPrivacy;
