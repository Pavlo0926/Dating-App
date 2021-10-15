import React from "react";
import { View } from "react-native";
import { Image } from "../image";
import { Text } from "../text";
import { Touchable } from "../touchable";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { Format } from "@helpers";
import { SCREENS } from "@constants";
import Images from "@assets/Images";

import styles from "./discover-people-item.style";

const DiscoverPeopleItem: () => React$Node = props => {
  let picture =
    props.user.images !== null && props.user.images.length > 0
      ? props.user.images[0].path
      : require("@assets/images/live-screen/user-temp3.png");
  let isOnline = Format.isRecently(props.user.last_activity);

  return (
    <Touchable style={styles.peopleContainer}
      onPress={() => {
        props.onShowProfile && props.onShowProfile();
      }}>
      <FastImage
        source={typeof picture === "string" ? { uri: picture } : picture}
        style={styles.peoplePicture}
      />
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.peopleNameContainer}
      >
        <Text style={styles.peopleName}>{props.user.first_name}</Text>
        {isOnline && <View style={styles.onlineMark} />}
      </LinearGradient>
      <Touchable
        style={styles.peopleAddContainer}
        onPress={() => props.onAddPeople && props.onAddPeople()}
        disabled={props.disabled}
      >
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.peopleAdd, props.disabled ? {opacity: 0.5} : {opacity: 1}]}
        >
          <Image source={Images.app.icPlus} style={styles.plusIcon} />
        </LinearGradient>
      </Touchable>
    </Touchable>
  );
};

export default DiscoverPeopleItem;
