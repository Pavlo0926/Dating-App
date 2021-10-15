import React from "react";
import { Linking, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Touchable } from "@components";
import styles from "./message-bubble.style.js";
import Images from "@assets/Images";
import ParsedText from 'react-native-parsed-text';
import MessageLiveItem from "./message-live-item.js";

const MessageBubble: () => React$Node = props => {
  const { currentMessage, user, nextMessage } = props;
  const isCurrentUser = currentMessage.user._id === user._id;
  const hasImage = currentMessage.image ? true : false;
  const hasText =
    currentMessage.text !== null && currentMessage.text !== "" ? true : false;

  const renderTicks = () => {
    if (!isCurrentUser) {
        return null;
    }
    
    if (currentMessage && nextMessage._id === undefined &&
        (currentMessage.message_info.sent || currentMessage.message_info.received || currentMessage.pending)) {          
      return (
        <View style={styles.tickContainer}>
          <View style={[styles.tickView, currentMessage.message_info.received ? styles.tickViewReceived : styles.tickViewSent]}>
            <FastImage source={Images.app.icCheck} style={styles.tick} />
          </View>
        </View>
      );
    }
    return null;
  }

  const handleUrlPress = (url) => {
    Linking.openURL(url);
  }

  if (currentMessage.type === "invite" || currentMessage.type === "close") {
    return (
      <View style={[styles.container, styles.containerMargin]}>
        <MessageLiveItem
          currentMessage={currentMessage}
          isCurrentUser={isCurrentUser}
          currentUser={user} />
      </View>
    )
  }

  return (
    <View style={[styles.container, hasImage && hasText ? {} : styles.containerMargin]}>
      {hasImage ? (
        <Touchable onPress={() => props.onFullImage(currentMessage.image)}>
          <FastImage
            source={{ uri: currentMessage.image }}
            style={[
              styles.messageImage,
              hasText ? styles.imageTextRound : styles.imageFullRound,
            ]}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Touchable>
      ) : null}
      {currentMessage.text !== null && currentMessage.text !== "" && (
        <View
          style={[
            styles.textContainer,
            isCurrentUser
              ? styles.currentUserTextContainer
              : styles.otherUserTextContainer,
            hasImage ? styles.imageText : {},
          ]}
        >
          <ParsedText
            style={[
              styles.text,
              isCurrentUser ? styles.currentUserText : styles.otherUserText,
            ]}
            parse={[
              {type: "url", style: styles.urlText, onPress: handleUrlPress}
            ]}
            allowFontScaling={false}
            selectable
          >
            {currentMessage.text}
          </ParsedText>
        </View>
      )}
      {renderTicks()}
    </View>
  );
};

export default MessageBubble;
