import React from "react";
import { View, Platform } from "react-native";
import { Text, BlurView } from "@components";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, AppBadges } from "@config";
import { Format } from "@helpers";
import Images from "@assets/Images";

import styles from "./liked-user-item.style";

const LikedUserItem: () => React$Node = props => {
  let likedUser = props.likedUser.user;

  const renderBlur = () => {
    if (props.user.premium === 1) {
      return null;
    }
    return (
      <View style={styles.blurContainer}>
        {Platform.OS === "android" ? (
          <View style={styles.blurView}/>
        ) : (
          <BlurView blurType={"light"} blurAmount={15}/>
        )}
        <View style={styles.blurWhiteView} />
        <View style={styles.blurGreenView} />
      </View>
    )
  }

  return (
    <View style={[styles.container]}>
      <FastImage
        source={{ uri: likedUser.images[0].path }}
        style={styles.userImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.badgesContainer}>
        {likedUser.badges.map(badge => {
          if (badge > AppBadges.length) return null;
          return (
            <FastImage
              key={`profile-badge-${badge}`}
              style={styles.badgeIcon}
              source={Images.badges[AppBadges[badge-1].id]} />
          );
        })}
      </View>

      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={GRADIENT.FADE_UP}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientBack}
        />
        <Text style={styles.nameText}>{likedUser.first_name}</Text>
        {Format.isRecently(likedUser.last_activity) && (
          <View style={styles.recentlyContainer}>
            <View style={styles.recentlyMark} />
            <Text style={styles.recentlyText}>Recently Active</Text>
          </View>
        )}
      </View>
      {renderBlur()}
    </View>
  );
};

export default LikedUserItem;
