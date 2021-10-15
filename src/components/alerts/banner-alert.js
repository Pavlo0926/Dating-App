import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, View } from "react-native";
import FastImage from "react-native-fast-image";
import { BoxShadow } from "../shadow";
import { Text } from "../text";
import { IconButton } from "../button";
import Images from "@assets/Images";
import { AppBadges } from "@config";

import styles, { width } from "./banner-alert.style";

const BannerAlert: () => React$Node = props => {
  const [height, setHeight] = useState(1);
  const hideTimeout = useRef(null);
  const [animValue] = useState(new Animated.Value(0));
  var translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0],
  });

  const shadowOption = {
    width: width - 10,
    height: height,
    color: "#0B0416",
    opacity: 0.5,
    _borderRadius: 11,
    spread: 0,
    blur: 10,
    offsetX: 0,
    offsetY: 6,
  };

  useEffect(() => {
    clearTimeout(hideTimeout.current);
    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      hideTimeout.current = setTimeout(() => {
        Animated.timing(animValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start(() => {
          props.hideNotification();
        });
      }, 10000);
    });
  }, [props.notification]);

  useEffect(() => {
    return () => {
      clearTimeout(hideTimeout.current);
    }
  }, []);

  return (
    <SafeAreaView>
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        <BoxShadow setting={shadowOption} />
        <View
          style={styles.contentContainer}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height);
          }}
        >
          <FastImage
            source={props.notification.user === 0 ? 
              require("@assets/images/app-icon.png") : 
              { uri: props.notification.user.images[0].path }}
            style={[styles.userImage, props.notification.user !== 0 && styles.greenBorder]}
          />

          <View style={styles.textContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.userName}>{props.notification.user === 0 ? "Pluzo Team" : props.notification.user.first_name}</Text>
              {props.notification.user !== 0 && props.notification.user.badges.map(badge => {
                if (badge > AppBadges.length) return null;
                return (
                  <View
                    key={`profile-badge-${badge}`}
                    style={styles.badgeIconContainer}
                  >
                    <FastImage source={Images.badges[AppBadges[badge-1].id]} style={styles.badgeIcon} />
                  </View>
                );
              })}
            </View>
            <Text style={styles.textChat} numberOfLines={1} ellipsizeMode={"tail"}>
              {props.notification.type === "friend" && "added you as a friend"}
              {props.notification.type === "livestream" &&
                "invited you to their livestream"}
              {props.notification.type === "chat" && props.notification.message === null
                ? "sent an image"
                : props.notification.message}
              {props.notification.type === "friend-match" && `${props.notification.user.first_name} is now your friend! 👏`}
              {props.notification.type === "livefriend" && `${props.notification.user.first_name} started a live video. Watch it before it ends!`}
            </Text>
          </View>

          {(props.notification.type === "friend" || props.notification.type === "livestream") && (
            <View style={styles.circleButton}>
              <IconButton
                backColor={"#ABA7D5"}
                icon={Images.app.icCross}
                iconWidth={14}
                iconHeight={14}
                onPress={() => {
                  if (props.notification.type === "friend") {
                    props.onRejectFriend(props.notification.user._id);
                  } else {
                    props.onRejectLive(props.notification.stream);
                  }
                }}
              />
            </View>
          )}
          {(props.notification.type === "friend" || props.notification.type === "livestream") && (
            <View style={styles.circleButton}>
              <IconButton
                backColor={"#00FF77"}
                icon={Images.app.icCheck}
                iconWidth={16.5}
                iconHeight={14}
                onPress={() => {
                  if (props.notification.type === "friend") {
                    props.onAcceptFriend(props.notification.user._id);
                  } else {
                    props.onAcceptLive(props.notification.stream);
                  }
                }}
              />
            </View>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default BannerAlert;
