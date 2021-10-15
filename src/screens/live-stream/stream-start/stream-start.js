import React, { useEffect, useState } from "react";
import { View, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import KeyboardManager from "react-native-keyboard-manager";
import { GradientButton } from "@components";
import { StreamStatus } from "@constants";
import StreamHeader from "../stream-header";
import StreamEmojiView from "../stream-emoji-view";

import styles from "./stream-start.style";

const StreamStart: () => React$Node = props => {
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
  }, []);

  const onStartLivestream = () => {
    let params = {
      channel_id: props.streamParams.channelName,
      category: category,
      name: title,
    };
    props.streamStart(params, props.token);
    props.onStartLivestream && props.onStartLivestream();
  };

  const onEmojiClick = () => {
    setVisibleCategory(!visibleCategory);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={[styles.container, styles.flexFill]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StreamHeader
          navigation={props.navigation}
          streamStatus={StreamStatus.PREPARING}
          selectedEmoji={category}
          onEmojiClick={onEmojiClick}
          onBack={props.onBack}
          onChangeTitle={text => setTitle(text)}
        />

        <View style={styles.liveButtonContainer}>
          <GradientButton onPress={onStartLivestream} text={"Start Livestream"} />
        </View>

        {visibleCategory && (
          <View style={styles.emojiContainer}>
            <StreamEmojiView onChangeEmoji={item => setCategory(item.id)} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StreamStart;
