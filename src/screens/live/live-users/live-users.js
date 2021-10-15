import React from "react";
import { FlatList, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Touchable, BoxShadow, Text } from "@components";
import EventBus from "eventing-bus";
import { StreamStatus, SCREENS } from "@constants";
import { widthPercentageToDP as wp } from "@helpers";

import styles from "./live-users.style";

const LiveUsers: () => React$Node = props => {
  const onJoinStream = item => {
    if (props.channelName === item.channel) return;
    let params = {
      channelName: item.channel,
      isBroadcaster: false,
      isJoin: true,
    };

    if (props.streamStatus !== StreamStatus.NONE) {
      EventBus.publish("APP_END_STREAM_ACTION");
      setTimeout(() => {
        EventBus.publish("NEW_STREAM_ACTION", params);
      }, 500);
    } else {
      EventBus.publish("NEW_STREAM_ACTION", params);
    }
  };
  return (
    <FlatList
      horizontal
      style={styles.usersList}
      contentContainerStyle={styles.usersListContentContainerStyle}
      data={[{ user: props.user }, ...props.streamUsers]}
      keyExtractor={item => `live-friends-${item.channel}`}
      renderItem={({ item: item, index }) => {
        if (item.user.id === props.user.id) {
          return (
            <Touchable style={styles.itemContainer} onPress={() => {
              props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: props.user });
            }}>
              <View>
                {/* <BoxShadow
                  setting={{
                    width: wp(50),
                    height: wp(50),
                    color: "#5400FF",
                    opacity: 0.36,
                    _borderRadius: wp(25),
                    spread: 0,
                    blur: 10,
                    offsetX: 0,
                    offsetY: 0,
                  }}
                /> */}
                <FastImage
                  source={{ uri: item.user.images[0].path }}
                  style={styles.itemImageSpotlight}
                />
                {/* <View style={styles.circleOne} />
                <View style={styles.circleTwo} />
                <View style={styles.circleThree} /> */}
              </View>
              {/* <Text style={styles.nameText}>Spotlight</Text> */}
            </Touchable>
          );
        } else {
          return (
            <Touchable
              style={styles.itemContainer}
              onPress={() => {
                onJoinStream(item);
              }}
            >
              <View>
                <BoxShadow
                  setting={{
                    width: wp(50),
                    height: wp(50),
                    color: "#00FFF6",
                    opacity: 0.36,
                    _borderRadius: wp(25),
                    spread: 0,
                    blur: 10,
                    offsetX: 0,
                    offsetY: 0,
                  }}
                />
                <FastImage
                  source={{ uri: item.user.images[0].path }}
                  style={styles.itemImage}
                />
              </View>
            </Touchable>
          );
        }
      }}
    />
  );
};

export default LiveUsers;
