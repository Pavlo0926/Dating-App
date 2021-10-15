import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, AppBadges } from "@config";
import moment from "moment";
import Images from "@assets/Images";
import styles from "./header.style";

const Header: () => React$Node = props => {
  var { first_name, birthday, address, state, city, badges, bio } = props.item;

  if (first_name === null || first_name === "") {
    first_name = "No Name";
  }
  birthday = moment().diff(moment.unix(birthday), "years");

  return (
    <View pointerEvents={"box-none"}>
      <View style={[styles.topActionRow, styles.topRowMargin]}>
        <Text style={styles.topBarName}>{first_name}</Text>
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.onlineStatus}
        />
        <Text style={styles.topBarName}>{birthday}</Text>
        <View style={styles.flexSpace} />
        <Touchable onPress={props.onReport}>
          <Image source={require("@assets/images/report.png")} />
        </Touchable>
      </View>
      <View style={[styles.topActionRow, styles.topRowMarginSmall]}>
        <Image source={require("@assets/images/swipe-screen/location.png")} />
        <Text style={styles.topBarCity}>{state === null ? city : state},</Text>
        <Text style={styles.topBarLocation}>{address === null ? "" : address}</Text>
      </View>
      <View style={styles.badgeContainer}>
        {badges.map(badge => {
          if (badge > AppBadges.length) return null;
          return (
            <Image
              key={`badge-${badge}`}
              style={styles.badgeIcon}
              source={Images.badges[AppBadges[badge-1].id]}
            />
          );
        })}
      </View>
      {props.showBio && <Text style={styles.bioText}>{bio}</Text>}
    </View>
  );
};

export default Header;
