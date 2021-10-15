import React from "react";
import { View } from "react-native";
import {
  Image,
  Touchable,
  GradientButton,
  BoxShadow,
  KeyboardListener,
} from "@components";
import { COLOR } from "@config";
import { InputToolbar as RNInputToolbar, Send, Composer } from "react-native-gifted-chat";
import { widthPercentageToDP as wp } from "@helpers";
import Images from "@assets/Images";

import styles from "./input-toolbar.style";

class InputToolbar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isFocused: false,
      width: 1,
      height: 1,
      composerHeight: 35,
    };
  }

  renderComposer = props => {
    return (
      <View style={styles.composerContainer}>
        <BoxShadow
          setting={{
            width: this.state.width,
            height: this.state.height,
            color: "#FFFFFF",
            opacity: 0.25,
            _borderRadius: wp(25),
            spread: 0,
            blur: 20,
            offsetX: 0,
            offsetY: 0,
            style: styles.composerShadow,
          }}
        />
        <View
          style={styles.inputContainer}
          onLayout={e => {
            this.setState({
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            });
          }}
        >
          <Composer
            {...props}
            placeholder={"Enter a message..."}
            placeholderTextColor={COLOR.TEXT_SECONDARY}
            textInputStyle={styles.inputField}
            textInputProps={{
              autoCorrect: true,
              allowFontScaling: false,
              returnKeyType: "send",
              onSubmitEditing: (e) => {
                props.onSendMessage();
              }
            }}
          />
        </View>
        <KeyboardListener
          onWillShow={() => this.setState({ isFocused: true })}
          onWillHide={() => {
            this.setState({ isFocused: false });
          }}
          onDidShow={() => this.setState({ isFocused: true })}
          onDidHide={() => {
            this.setState({ isFocused: false });
          }}
        />
      </View>
    );
  };

  renderSend = props => {
    const { text } = props;
    if (text !== "") {
      return (
        <Send {...props} containerStyle={styles.sendButtonContainer}>
          <GradientButton
            noButton
            noShadow
            containerStyle={styles.sendButton}
            icon={Images.app.icBackUp}
            iconStyle={styles.sendButtonIcon}
          />
        </Send>
      );
    } else {
      return (
        <Touchable style={styles.cameraButton} onPress={() => this.props.onAttachment()}>
          <Image
            source={require("@assets/images/ic-camera.png")}
            style={styles.cameraButtonIcon}
          />
        </Touchable>
      );
    }
  };

  render() {
    return (
      <RNInputToolbar
        {...this.props}
        containerStyle={styles.container}
        renderSend={this.renderSend}
        renderComposer={this.renderComposer}
      />
    );
  }
}

export default InputToolbar;
