import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { StreamSetting } from "@constants";
import { Screen, Touchable, Image, Text, GestureRecognizer } from "@components";
import EventBus from "eventing-bus";
import Images from "@assets/Images";

import styles from "./stream-player-setting.style";

const items = [
  { id: 1, icon: Images.app.icReverse, mark: false },
  { id: 2, icon: Images.app.icLive, mark: false },
  { id: 3, icon: Images.app.icMicLarge, mark: false },
  { id: 4, icon: Images.app.icShare, mark: false },
  { id: 5, icon: Images.app.icFilter, mark: true },
];

const StreamPlayerSetting: () => React$Node = props => {
  const [shareScreen, setShareScreen] = useState(false);

  const onItemClicked = itemId => {
    if (itemId === 1) {
      EventBus.publish(StreamSetting.SWITCH_CAMERA);
    } else if (itemId === 2) {
      props.setEnabledCamera(!props.isEnabledCamera);
    } else if (itemId === 3) {
      props.setEnabledMic(!props.isEnabledMic);
    } else if (itemId === 4) {
      setShareScreen(!shareScreen);
      EventBus.publish(StreamSetting.CHANGE_SHARE);
    } else {
      console.log("coming soon");
    }
  };

  const renderItem = item => {
    let stateStyle = {};
    let text = "";
    if (item.id === 1) {
      text = `Reverse\ncamera`;
    } else if (item.id === 2) {
      if (props.isEnabledCamera) {
        text = `Disable\ncamera`;
      } else {
        text = `Enable\ncamera`;
        stateStyle = styles.buttonCircleRed;
      }
    } else if (item.id === 3) {
      if (props.isEnabledMic) {
        text = `Mute\nmicrophone`;
      } else {
        text = `Active\nmicrophone`;
        stateStyle = styles.buttonCircleRed;
      }
    } else if (item.id === 4) {
      if (!shareScreen) {
        text = `Share\nscreen`;
      } else {
        text = `End\nscreenshare`;
        stateStyle = styles.buttonCircleGreen;
      }
    } else {
      text = `Filters`;
    }
    return (
      <Touchable key={`setting-item-${item.id}`} onPress={() => onItemClicked(item.id)}>
        <View style={styles.button}>
          <View style={[styles.buttonCircle, stateStyle]}>
            <Image source={item.icon} />
          </View>
          <Text style={styles.buttonText}>{text}</Text>
          {item.mark && (
            <LinearGradient
              colors={GRADIENT.BUTTON}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.markCircle}
            />
          )}
        </View>
      </Touchable>
    );
  };

  return (
    <GestureRecognizer
      style={styles.container}
      enableMoveDown={true}
      maxMoveDown={100}
      onSwipeDown={state => props.onHidePlayerSetting()}
    >
      <Screen hasGradient style={styles.contentContainer}>
        <Touchable
          style={styles.backButton}
          onPress={() => {
            props.onHidePlayerSetting && props.onHidePlayerSetting();
          }}
        />
        <SafeAreaView style={styles.buttonContainer}>
          {items.map((item, index) => {
            return renderItem(item);
          })}
        </SafeAreaView>
      </Screen>
    </GestureRecognizer>
  );
};

export default StreamPlayerSetting;
