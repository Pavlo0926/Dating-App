import React from "react";
import { View, SafeAreaView } from "react-native";
import { Image, Text, Touchable } from "@components";
import { AppBadges } from "@config";
import FastImage from "react-native-fast-image";
import moment from "moment";
import Images from "@assets/Images";
import styles from "./header.style";

const Header: () => React$Node = props => {
  const { first_name, images, avatar, badges } = props.user;
  let name = first_name === null ? "No Name" : first_name;
  let userImage =
    props.user === 0
      ? null
      : images !== undefined && images.length > 0
      ? images[0].path
      : avatar;
  let picture = userImage === null ? Images.app.userPlaceholder : userImage;
  if (props.user === 0) {
    name = "Pluzo Team";
    picture = require("@assets/images/app-icon.png");
  }
  let timeAgo = null;
  if (props.lastSeenTime !== null) {
    moment.updateLocale('en', {
      relativeTime : {
          future: "in %s",
          past:   "%s ago",
          s  : 'recently',
          ss : '%d seconds',
          m:  "a minute",
          mm: "%d minutes",
          h:  "an hour",
          hh: "%d hours",
          d:  "a day",
          dd: "%d days",
          w:  "a week",
          ww: "%d weeks",
          M:  "a month",
          MM: "%d months",
          y:  "a year",
          yy: "%d years"
      }
    });
    timeAgo = moment.unix(props.lastSeenTime).fromNow();
    if (timeAgo === "recently ago") timeAgo = "recently";
  }

  return (
    <View style={styles.headerContainer}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.backButtonContainer}>
            <Touchable
              style={styles.backButtonTouchable}
              onPress={() => {
                props.onBack();
              }}
            >
              <Image source={require("@assets/images/chevron-left.png")} />
            </Touchable>
          </View>
          <Touchable
            onPress={() => {
              props.onProfileView();
            }}
            style={styles.headerContentContainer}
          >
            <FastImage
              style={styles.headerImage}
              source={typeof picture === "string" ? { uri: picture } : picture}
            />
            <View style={styles.flexFill}>
              <View style={styles.headerNameContainer}>
                <Text style={styles.headerTitle}>{name}</Text>
                {props.user !== 0 && badges && badges.map(badge => {
                  if (badge > AppBadges.length) return null;
                  return (
                    <Image key={`user-badge-${badge}`} style={styles.badgeImage} 
                      source={Images.badges[AppBadges[badge-1].id]} />
                  );
                })}
              </View>
              {/* , styles.activeUser */}
              <Text style={[styles.lastSeenText,props.isOnline ? styles.activeUser : {}]}>
                {props.isOnline ? "online" : timeAgo !== null ? `last seen ${timeAgo}` : ""}
              </Text>
            </View>
          </Touchable>
          {props.user !== 0 &&
          <View style={styles.reportButtonContainer}>
            <Touchable style={styles.reportButtonTouchable} onPress={props.onReport}>
              <Image
                source={require("@assets/images/report.png")}
                style={styles.reportIcon}
              />
            </Touchable>
          </View>}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
