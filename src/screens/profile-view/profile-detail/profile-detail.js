import React from "react";
import { View } from "react-native";
import { Image, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, AppBadges } from "@config";
import { Distance } from "@helpers";
import moment from "moment";
import Images from "@assets/Images";
import styles from "./profile-detail.style";

const ProfileDetail: () => React$Node = props => {
  var {
    first_name,
    birthday,
    address,
    state,
    city,
    latitude,
    longitude,
    badges,
  } = props.user;
  const { location, imageIndex } = props;

  if (first_name === null || first_name === "") {
    first_name = "No Name";
  }
  birthday = moment().diff(moment.unix(birthday), "years");
  var distance = " - ";
  if (latitude !== null && longitude !== null && location !== null) {
    distance = Distance.getDistance(
      latitude,
      longitude,
      location.coords.latitude,
      location.coords.longitude,
    );
  }
  let isOwner = true; //props.owner.id === (props.user.id || props.user._id);

  return (
    <View style={styles.container}>
      <View style={[styles.topActionRow, styles.topRowMargin]}>
        <Text style={styles.topBarName}>{first_name}</Text>
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.onlineStatus}
        />
        <Text style={styles.topBarName}>{birthday}</Text>
        <View style={styles.flexSpace} />
        <View style={styles.iconContainer}>
          <Image
            source={require("@assets/images/swipe-screen/info.png")}
            style={styles.infoIcon}
          />
          {!isOwner && (
            <LinearGradient
              colors={GRADIENT.BUTTON}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.distanceContainer}
            >
              <Text style={styles.distanceText}>{distance}</Text>
              <Text style={styles.distanceUnit}>MI</Text>
            </LinearGradient>
          )}
        </View>
      </View>
      <View style={[styles.topActionRow, styles.topRowMarginSmall]}>
        <Image source={require("@assets/images/swipe-screen/location.png")} />
        {(state !== null || city !== null) && (
          <Text style={styles.topBarCity}>{state === null ? city : state},</Text>
        )}
        <Text style={styles.topBarLocation}>
          {address === null ? "no address" : address}
        </Text>
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
      {imageIndex === props.user.images.length && (
        <Text style={styles.bioText}>{props.user.bio}</Text>
      )}
    </View>
  );
};

export default ProfileDetail;
