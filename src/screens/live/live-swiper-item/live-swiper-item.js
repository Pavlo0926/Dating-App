import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable, HorizontalImagesLayout } from "@components";
import LinearGradient from "react-native-linear-gradient";
import Images from "@assets/Images";
import { GRADIENT, AppTags } from "@config";

import styles from "./live-swiper-item.style";

const LiveSwiperItem: () => React$Node = props => {
  const { item } = props;
  let combinedNames = "";
  item.info.names.forEach(value => {
    combinedNames += `, ${value}`;
  });
  combinedNames = combinedNames.substring(2);

  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        props.onJoinStream(item);
      }}
    >
      <View style={styles.imageContainer}>
        <HorizontalImagesLayout images={item.info.streamers_images} />
      </View>
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.dataContainer}
      >
        <View style={styles.tagContainer}>
          <LinearGradient
            colors={GRADIENT.BUTTON}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.membersContainer}
          >
            <Image
              source={require("@assets/images/live-screen/live-user.png")}
              style={styles.memberIcon}
            />
            <Text style={styles.memberCount}>{parseInt(item.count, 10)}</Text>
          </LinearGradient>
          {/* <Image
            source={Images.live[AppTags[item.category].icon]}
            style={styles.tagImage}
          /> */}
          <View style={[styles.itemColorView, {backgroundColor: AppTags[item.category].color}]} />
        </View>
        <Text style={styles.userName} numberOfLines={1}>
          {combinedNames}
        </Text>
      </LinearGradient>
    </Touchable>
  );
};

export default LiveSwiperItem;
