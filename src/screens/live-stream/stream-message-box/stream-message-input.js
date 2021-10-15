import React, { Component } from "react";
import {
  View,
  TextInput as RNTextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Touchable, Image, GradientButton, AnimatedDots } from "@components";
import Images from "@assets/Images";

import styles from "./stream-message-input.style";

class StreamMessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      width: Dimensions.get("window").width - 25,
    };
    this.isSending = false;
  }

  onSend = () => {
    if (this.isSending) return;
    this.isSending = true;
    let msg = this.state.message.trim();
    if (msg === "") {
      this.isSending = false;
      return;
    }

    this.props.onSend(this.state.message);
    this.setState({ message: "" });
    setTimeout(() => {
      this.isSending = false;
    }, 300);
  };

  render() {
    const { isKeyboardShown, isBroadcaster } = this.props;
    return (
      <View style={[styles.container, isKeyboardShown ? styles.bottomMargin : {}]}>
        <ScrollView
          style={styles.inputContainer}
          contentContainerStyle={styles.flexFill}
          horizontal
          keyboardShouldPersistTaps={"always"}
        >
          <RNTextInput
            value={this.state.message}
            style={styles.inputField}
            placeholder={"Enter a message..."}
            placeholderTextColor={"#FFFFFF"}
            returnKeyType={"send"}
            returnKeyLabel={"Send"}
            blurOnSubmit={false}
            autoCorrect={true}
            allowFontScaling={false}
            numberOfLines={1}
            onChangeText={message => this.setState({ message })}
            onSubmitEditing={() => {
              this.onSend();
            }}
          />
          {this.state.message !== "" &&
          <View style={[styles.sendButtonContainer, isKeyboardShown && styles.noMarginRight]}>
            <GradientButton
              containerStyle={styles.sendButton}
              icon={Images.app.icBackUp}
              iconStyle={styles.sendButtonIcon}
              onPress={() => {
                this.onSend();
              }}
            />
          </View>}
        </ScrollView>
        {!isKeyboardShown && isBroadcaster && (
          <Touchable
            onPress={() => {
              this.props.onPlayerSetting && this.props.onPlayerSetting();
            }}
          >
            <Image source={Images.app.icSetting} style={styles.settingIcon} />
          </Touchable>
        )}
        {!isKeyboardShown && !isBroadcaster && (
          <Touchable
            onPress={() => {
              this.props.onAskToJoin && this.props.onAskToJoin();
            }}
            style={styles.handButton}
          >
            <Image source={Images.live.icHand} style={styles.handIcon} />
            {this.props.isAskedJoin &&
            <AnimatedDots style={{marginTop: 4.5}} />}
          </Touchable>
        )}
      </View>
    );
  }
}

export default StreamMessageInput;
