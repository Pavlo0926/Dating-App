import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, ScrollView, FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { Touchable, Image, Text, KeyboardListener } from "@components";
import KeyboardManager from "react-native-keyboard-manager";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import FastImage from "react-native-fast-image";
import EventBus from "eventing-bus";
import moment from "moment";

import { StreamStatus } from "@constants";
import { GRADIENT } from "@config";
import Images from "@assets/Images";

import StreamMessageInput from "./stream-message-input";
import styles from "./stream-message-box.style.js";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

class StreamMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardShow: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(false);
      KeyboardManager.setShouldResignOnTouchOutside(false);
    }
    
    if (EventBus.callbacks["Stream_new_message"]) {
      EventBus.callbacks["Stream_new_message"] = EventBus.callbacks["Stream_new_message"].filter(function(callback) {
        return false;
      });
    }
    this.newMessageAction = EventBus.on("Stream_new_message", jsonData => {
      if (jsonData === undefined) return;
      const { channelName } = this.props.streamParams;
      let data = JSON.parse(jsonData);
      if (channelName === data.stream && this.props.user.id !== parseInt(data.user._id, 10)) {
        let newMessage = {
          id: `${moment().unix()}.${moment().millisecond()}`,
          user: data.user,
          message: data.message,
          type: parseInt(data.type, 10) === 1 ? "user" : "system",
        };
        this.props.updateMessages([newMessage].concat(this.props.messages));
      }
    });
  }

  componentWillUnMount() {console.log("UnMounted");
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
    this.newMessageAction();
  }

  keyboardWillShow = e => {
    if (this.props.onKeyboardShow !== null) {
      this.props.onKeyboardShow(e);
    }
    this.setState({ keyboardShow: true });
  };

  keyboardWillHide = e => {
    if (this.props.onKeyboardHide !== null) {
      this.props.onKeyboardHide(e);
    }
    this.setState({ keyboardShow: false });
  };

  onSendMessage = (msg, msgType) => {
    let newMessage = {
      id: `${moment().unix()}.${moment().millisecond()}`,
      user: this.props.user,
      message: msg,
    };
    this.props.updateMessages([newMessage].concat(this.props.messages));

    const { channelName } = this.props.streamParams;
    this.props.requestChatAdd(channelName, msg, msgType, this.props.token);
  };

  onButtonsClicked = msg => {
    this.props.setStreamStatus(StreamStatus.JOIN_MESSAGED);
    this.onSendMessage(msg, 1);
  };

  renderMessageItem = message => {
    if (message.type === "system") {
      return (
        <AnimatableView style={styles.messageItemContainer}
          animation={"fadeIn"}
          delay={200}>
          <View style={styles.messageSystemTextContainer}>
            <Text style={styles.messageSystemText}>{message.message}</Text>
          </View>
        </AnimatableView>
      );
    } else {
      return (
        <AnimatableView style={styles.messageItemContainer}
          animation={"fadeIn"}
          delay={200}>
          <View style={styles.messageTextContainer}>
            <Text style={styles.messageUser}>{message.user.first_name}</Text>
            {message.message === "(laugh)" && <Image source={Images.live.emojiLaugh} />}
            {message.message !== "(laugh)" && (
              <Text style={styles.messageText}>{message.message}</Text>
            )}
          </View>
          <Touchable
            style={styles.messageAvatarContainer}
            onPress={() => this.props.onShowProfile(message.user)}
          >
            <FastImage
              source={{ uri: message.user.images[0].path }}
              style={styles.messageAvatar}
            />
          </Touchable>
        </AnimatableView>
      );
    }
  };

  render() {
    const { streamStatus, bottomPadding } = this.props;
    return (
      <KeyboardAvoidingView style={[styles.container, {paddingBottom: bottomPadding}]}>
        <LinearGradient
          colors={GRADIENT.FADE_UP}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.opacityBottom]}
        />
        <StreamMessageInput
          isKeyboardShown={this.state.keyboardShow}
          isBroadcaster={this.props.isBroadcaster}
          onGameControls={this.props.onGameControls}
          onPlayerSetting={this.props.onPlayerSetting}
          onAskToJoin={this.props.onAskToJoin}
          onSend={msg => this.onSendMessage(msg, 1)}
          isAskedJoin={this.props.isAskedToJoin}
        />

        {streamStatus === StreamStatus.STARTED ||
        streamStatus === StreamStatus.JOIN_MESSAGED ? null : (
          <View style={styles.defaultButtonsContainer}>
            <ScrollView horizontal keyboardShouldPersistTaps={"always"}>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("Hello!")}
              >
                <Text style={styles.defaultButtonText}>Hello!</Text>
              </Touchable>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("(laugh)")}
              >
                <Image source={Images.live.emojiLaugh} />
              </Touchable>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("Invite me please")}
              >
                <Text style={styles.defaultButtonText}>Invite me please</Text>
              </Touchable>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("LMAO")}
              >
                <Text style={styles.defaultButtonText}>LMAO</Text>
              </Touchable>
            </ScrollView>
          </View>
        )}

        {(streamStatus === StreamStatus.JOINED ||
          streamStatus === StreamStatus.JOIN_MESSAGED ||
          streamStatus === StreamStatus.STARTED) && (
          <FlatList
            style={styles.messageList}
            data={this.props.messages}
            inverted
            keyExtractor={(item, index) => `chat-msg-${index}`}
            renderItem={({ item: message, index }) => {
              return this.renderMessageItem(message);
            }}
          />
        )}

        <KeyboardListener
          onWillShow={e => this.keyboardWillShow(e)}
          onWillHide={e => this.keyboardWillHide(e)}
          onDidShow={e => {
            if (Platform.OS === "android") {
              this.keyboardWillShow(e);
            }
          }}
          onDidHide={e => {
            if (Platform.OS === "android") {
              this.keyboardWillHide(e);
            }
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

StreamMessageBox.propTypes = {
  onKeyboardShow: PropTypes.func,
  onKeyboardHide: PropTypes.func,
};

StreamMessageBox.defaultProps = {
  onKeyboardShow: null,
  onKeyboardHide: null,
};

export default StreamMessageBox;
