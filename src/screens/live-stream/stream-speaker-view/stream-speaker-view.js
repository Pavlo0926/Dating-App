import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureRecognizer, Touchable, Text, NotificationModal } from "@components";
import EventBus from "eventing-bus";
import * as Animatable from "react-native-animatable";
import Images from "@assets/Images";
import StreamUserIcon from "../stream-user-icon";
import moment from "moment";

import styles from "./stream-speaker-view.style";

const StreamSpeakerView: () => React$Node = props => {
  const [visibleNotification, setVisibleNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    text: "Are you sure",
    logoBackground: "#ABA7D5",
    logoTintColor: "black",
    buttonColors: ["#ABA7D5", "#ABA7D5"],
    buttonText: "Okay",
    buttonTextStyle: "#0B0516",
  });
  const [expandView, setExpandView] = useState(false);
  let volumeView = React.createRef();
  let broadcasterId =
    parseInt(props.broadcaster._id, 10) || parseInt(props.broadcaster.id, 10);
  if (broadcasterId === props.user.id) {
    broadcasterId = 0;
  }
  let isLarge = props.large;
  let isMuted = false;
  if (props.remoteMutedUsers.filter((value) => value === broadcasterId).length > 0) {
    isMuted = true;
  }

  const onMute = () => {
    setNotificationData({
      text: `Are you sure you want to ${isMuted ? "unmute" : "mute"} ${props.broadcaster.first_name}`,
      logoBackground: "#312446",
      logoTintColor: "white",
      buttonColors: ["#312446", "#312446"],
      buttonText: "Okay",
      buttonTextStyle: "white",
      type: isMuted ? "unmute" : "mute",
    });
    setVisibleNotification(true);
  };

  const onKick = () => {
    setNotificationData({
      text: `Are you sure you want to kick ${props.broadcaster.first_name}`,
      logoBackground: "#312446",
      logoTintColor: "white",
      buttonColors: ["#312446", "#312446"],
      buttonText: "Okay",
      buttonTextStyle: "white",
      type: "kick",
    });
    setVisibleNotification(true);
  };

  const onBan = () => {
    setNotificationData({
      text: `Are you sure you want to ban ${props.broadcaster.first_name}`,
      logoBackground: "#FF0036",
      logoTintColor: "#0B0516",
      buttonColors: ["#FF0036", "#FF0036"],
      buttonText: "Okay",
      buttonTextStyle: "#0B0516",
      type: "ban",
    });
    setVisibleNotification(true);
  };

  const onSendSystemMsg = (msg) => {
    let newMessage = {
      id: `${moment().unix()}.${moment().millisecond()}`,
      user: props.user,
      message: msg,
      type: "system",
    };
    props.updateMessages([newMessage].concat(props.messages));
    props.requestChatAdd(props.stream.channel, msg, 2, props.token);
  };

  useEffect(() => {
    const updateSpeakerAction = EventBus.on("NEW_SPEAKERS", speakers => {
      if (props.mutedUsers.includes(parseInt(props.broadcaster._id, 10) || parseInt(props.broadcaster.id, 10))) return;
      let users = speakers.filter(speaker => speaker.uid === broadcasterId);
      if (volumeView !== null && users.length > 0) {
        let maxValue = isLarge ? 0.3 : 0.2;
        volumeView.animate(
          {
            0: {
              opacity: 1,
              scale: 0.9,
            },
            1: {
              opacity: 1,
              scale: 1 + (maxValue / 130) * users[0].volume,
            },
          },
          100,
        );
      }
    });
    return () => {
      updateSpeakerAction();
    };
  }, [volumeView, broadcasterId, isLarge]);

  return (
    <GestureRecognizer
      config={{
        velocityThreshold: 0,
        directionalOffsetThreshold: 10,
        gestureIsClickThreshold: 5,
      }}
      onSwipeLeft={() => props.isGesture && setExpandView(true)}
      onSwipeRight={() => props.isGesture && setExpandView(false)}>
      <View style={props.style}>
        {expandView &&
        <View style={styles.expandContainer}>
          <Animatable.View style={styles.expandContentContainer}
            animation={"slideInRight"}
            duration={300}
            delay={0}>
            <Touchable style={styles.muteButton} onPress={() => onMute()}>
              <Text style={[styles.expandButtonText, isMuted && styles.expandButtonTextLong]}>{isMuted ? "Unmute" : "Mute"}</Text>
            </Touchable>
            <Touchable style={styles.kickButton} onPress={() => onKick()}>
              <Text style={styles.expandButtonText}>Kick</Text>
            </Touchable>
            <Touchable style={styles.banButton} onPress={() => onBan()}>
              <Text style={[styles.expandButtonTextBlack]}>Ban</Text>
            </Touchable>
          </Animatable.View>
        </View>}
        {!props.mutedUsers.includes(parseInt(props.broadcaster._id, 10) || parseInt(props.broadcaster.id, 10)) &&
        <Animatable.View
          style={isLarge ? styles.volumeContainer1 : styles.volumeContainer}
          ref={ref => (volumeView = ref)}
        />}
        <StreamUserIcon
          user={props.broadcaster}
          style={props.imageStyle}
          onImagePress={
            props.onShowProfile
              ? () => {
                  if (expandView) {
                    setExpandView(false);
                    return;
                  }
                  props.onShowProfile(props.broadcaster);
                }
              : null
          }
        />
        
        <NotificationModal 
          isVisible={visibleNotification}
          title={notificationData.text}
          message={""}
          logoIcon={Images.app.icInfo}
          logoTintColor={notificationData.logoTintColor}
          logoBackground={notificationData.logoBackground}
          buttonColors={notificationData.buttonColors}
          buttonText={notificationData.buttonText}
          buttonTextStyle={notificationData.buttonTextStyle}
          buttonContainerStyle={{marginTop: 32}}
          onBack={() => setVisibleNotification(false)}
          onConfirm={(a, b) => {
            setVisibleNotification(false);
            if (notificationData.type === "kick") {
              props.requestStreamKickUser(broadcasterId, props.stream.channel, props.token);
              onSendSystemMsg(`${props.broadcaster.first_name} kicked out.`);
            } else if (notificationData.type === "ban") {
              props.requestStreamBanUser(broadcasterId, props.stream.channel, props.token);
              onSendSystemMsg(`${props.broadcaster.first_name} banned.`);
            } else {
              if (isMuted) {
                EventBus.publish("REMOTE_USER_MUTE", {userId: broadcasterId, mute: false});
              } else {
                EventBus.publish("REMOTE_USER_MUTE", {userId: broadcasterId, mute: true});
              }
            }
          }} 
        />
      </View>
    </GestureRecognizer>
  );
};

export default StreamSpeakerView;
