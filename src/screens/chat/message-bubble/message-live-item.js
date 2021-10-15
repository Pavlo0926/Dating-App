import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import EventBus from "eventing-bus";
import LinearGradient from "react-native-linear-gradient";
import { Touchable, Text, BoxShadow } from "@components";
import { widthPercentageToDP as wp } from "@helpers";
import { GRADIENT } from "@config";
import { StreamStatus } from "@constants";
import LiveItem from "../../live/live-item";

import styles from "./message-live-item.style";

const MessageLiveItem: () => React$Node = props => {
  const { currentMessage, isCurrentUser, currentUser } = props;
  const [height, setHeight] = useState(1);

  const shadowOption = {
    width: wp(175),
    height: height,
    color: "#000000",
    opacity: 0.16,
    _borderRadius: wp(22),
    spread: 0,
    blur: 6,
    offsetX: 0,
    offsetY: 3,
  };

  if (currentMessage.type === "close") {
    return (
      <View style={styles.endContainer}>
        <Text style={styles.endText}>{"The Live has ended."}</Text>
        <BoxShadow setting={shadowOption} />
        <View style={[styles.liveContentContainer, styles.endContentPadding]}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
          <Text numberOfLines={1} style={styles.liveNameText}>
            {currentMessage.stream_info.name === "" ? "No Name" : currentMessage.stream_info.name}
          </Text>
          <Text style={styles.liveCreatorText}>
            {currentMessage.user.first_name}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <Touchable onPress={() => {
      let channelName = currentMessage.stream_info.channel;
      let names = channelName.split("-");
      if (names.length > 1 && parseInt(names[1], 10) === parseInt(currentUser._id, 10) ||
        props.channelName === channelName) {
        return;
      }
      
      if (currentMessage.stream_info.ban_list.filter((value) => value.user_id === currentUser._id).length > 0) {
        return;
      }
  
      let params = {
        channelName,
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
    }}>
      <LinearGradient
        colors={GRADIENT.BUTTON}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={styles.liveContainer}
      >
        <Text style={styles.liveJoinText}>Join</Text>
        <BoxShadow setting={shadowOption} />
        <View style={styles.liveContentContainer}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
          <LiveItem item={currentMessage.stream_info}/>
        </View>
      </LinearGradient>
    </Touchable>
  )
};

function mapStateToProps(state) {
  return {
    streamStatus: state.live.streamStatus,
    channelName: state.live.channelName,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageLiveItem);
