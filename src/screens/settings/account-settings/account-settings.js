import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import Images from "@assets/Images";
import { Format } from "@helpers";
import { SCREENS } from "@constants";

import Header from "../header";
import UpdateNameModal from "./update-name-modal";
import UpdatePasswordModal from "./update-password-modal";
import UpdatePhoneModal from "./update-phone-modal";
import styles from "./account-settings.style";

const AccountSettings: () => React$Node = props => {
  const [visibleName, setVisibleName] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePhone, setVisiblePhone] = useState(false);

  const onUpdatePhoneNumber = (phone) => {
    console.log(phone);
    props.navigation.navigate(SCREENS.UPDATE_PHONE_VERIFICATION, {phoneNumber: phone});
  }

  const renderItem = (title, text, isArrow) => {
    return (
      <View style={[styles.flexRow, styles.itemPadding]}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{text}</Text>
        {isArrow && <Image source={Images.app.icRight} style={styles.arrowIcon} />}
      </View>
    );
  };

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={"Account"} onBack={props.navigation.goBack} />

          <Touchable onPress={() => setVisibleName(true)}>
            {renderItem("Name", props.user.first_name, false)}
          </Touchable>
          <View style={styles.seperator} />
          {renderItem("Birth Date", Format.date(props.user.birthday), false)}
          <View style={styles.seperator} />
          {renderItem("Gender", Format.stringFromGender(props.user.gender), false)}
          <View style={styles.emptyRow} />
          {renderItem("Username", props.user.username, false)}
          <View style={styles.seperator} />
          <Touchable onPress={() => setVisiblePhone(true)}>
            {renderItem("Phone Number", Format.phoneNumber(props.user.phone), false)}
          </Touchable>
          <View style={styles.emptyRow} />
          <Touchable onPress={() => setVisiblePassword(true)}>
            {renderItem("Change Password", "", true)}
          </Touchable>
        </View>

        <UpdateNameModal
          isVisible={visibleName}
          onSwipeComplete={() => setVisibleName(false)}
        />

        <UpdatePasswordModal
          isVisible={visiblePassword}
          onSwipeComplete={() => setVisiblePassword(false)}
        />
        
        <UpdatePhoneModal
          isVisible={visiblePhone}
          onSwipeComplete={() => setVisiblePhone(false)}
          updatePhoneNumber={(phone) => onUpdatePhoneNumber(phone)}
        />
      </SafeAreaView>
    </Screen>
  );
};

export default AccountSettings;
