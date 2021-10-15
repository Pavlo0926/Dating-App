import React, { PureComponent } from "react";
import {
  Modal,
  Platform,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { BlurView } from "../blur-view";
import { Screen } from "../screen";
import { Text } from "../text";
import { TextInput } from "../text-input";
import { BoxShadow } from "../shadow";
import { KeyboardListener } from "../keyboard-listener";
import Images from "@assets/Images";
import styles, { height as screenHeight } from "./dialog-input.style";

class DialogInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputModal: props.initValueTextInput,
      openning: true,
      width: 0,
      height: 0,
      keyboardSpacing: 0,
    };
  }

  handleOnRequestClose = () => {
    this.props.closeDialog();
    this.setState({ inputModal: "" });
  };

  handleOnKeyPress = () => {
    this.setState({ openning: false });
  };

  handleOnChangeText = inputModal => {
    this.setState({ inputModal, openning: false });
  };

  handleOnCloseDialog = () => {
    this.props.closeDialog();
    this.setState({ inputModal: "", openning: true, keyboardSpacing: 0 });
  };

  handleSubmit = () => {
    this.props.submitInput(this.state.inputModal);
    this.setState({ inputModal: "", openning: true });
  };

  render() {
    const title = this.props.title || "";
    const hintInput = this.props.hintInput || "";
    let value = "";
    if (!this.state.openning) {
      value = this.state.inputModal;
    } else {
      value = this.props.initValueTextInput ? this.props.initValueTextInput : "";
    }

    const textProps = this.props.textInputProps || null;
    const modalStyleProps = this.props.modalStyle || {};
    const dialogStyleProps = this.props.dialogStyle || {};
    const placeholderTextColor = this.props.placeholderTextColor;
    const animationType = this.props.animationType || "fade";
    let cancelText = this.props.cancelText || "Cancel";
    let submitText = this.props.submitText || "Submit";
    cancelText = Platform.OS === "ios" ? cancelText : cancelText.toUpperCase();
    submitText = Platform.OS === "ios" ? submitText : submitText.toUpperCase();
    const shadowOption = {
      width: this.state.width,
      height: this.state.height,
      color: "#0B0516",
      opacity: 1,
      _borderRadius: 22,
      spread: 0,
      blur: 20,
      offsetX: 0,
      offsetY: 6,
    };
    const { keyboardSpacing, height } = this.state;
    let realSpacing = (screenHeight - height) / 2;
    
    return (
      <Modal
        animationType={animationType}
        transparent={true}
        visible={this.props.isDialogVisible}
        onRequestClose={this.handleOnRequestClose}
      >
        <KeyboardAvoidingView style={[styles.container, { ...modalStyleProps }]}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={this.handleOnCloseDialog}
          >
            <BlurView />
            <View
              onLayout={e => {
                this.setState({
                  width: e.nativeEvent.layout.width,
                  height: e.nativeEvent.layout.height,
                });
              }}
              style={(realSpacing - keyboardSpacing) < 10 ? {marginBottom: keyboardSpacing - realSpacing + 30} : {}}
            >
              <BoxShadow setting={shadowOption} />
              <Screen
                hasGradient
                style={[styles.modal_container, { ...dialogStyleProps }]}
              >
                <View style={styles.modal_body}>
                  <Text style={styles.title_modal}>{title}</Text>
                  <Text
                    style={[
                      this.props.message ? styles.message_modal : styles.noneHeight,
                    ]}
                  >
                    {this.props.message}
                  </Text>
                  <View style={styles.input_container}>
                    <TextInput
                      autoCorrect={
                        textProps && textProps.autoCorrect === false ? false : true
                      }
                      autoCapitalize={
                        textProps && textProps.autoCapitalize
                          ? textProps.autoCapitalize
                          : "none"
                      }
                      clearButtonMode={
                        textProps && textProps.clearButtonMode
                          ? textProps.clearButtonMode
                          : "never"
                      }
                      clearTextOnFocus={
                        textProps && textProps.clearTextOnFocus === true
                          ? textProps.clearTextOnFocus
                          : false
                      }
                      keyboardType={
                        textProps && textProps.keyboardType
                          ? textProps.keyboardType
                          : "default"
                      }
                      secureTextEntry={
                        textProps && textProps.secureTextEntry
                          ? textProps.secureTextEntry
                          : false
                      }
                      maxLength={
                        textProps && textProps.maxLength > 0 ? textProps.maxLength : null
                      }
                      autoFocus={false}
                      allowFontScaling={false}
                      onKeyPress={this.handleOnKeyPress}
                      underlineColorAndroid='transparent'
                      placeholder={hintInput}
                      placeholderTextColor={placeholderTextColor}
                      onChangeText={this.handleOnChangeText}
                      value={value}
                    />
                  </View>
                </View>
                <View style={styles.btn_container}>
                  <TouchableOpacity
                    style={styles.touch_modal}
                    onPress={this.handleSubmit}
                  >
                    <Image source={Images.settings.icTrash} />
                    <Text style={styles.btn_modal_right}>{submitText}</Text>
                  </TouchableOpacity>
                  <View style={styles.divider_btn} />
                  <TouchableOpacity
                    style={styles.touch_modal}
                    onPress={this.handleOnCloseDialog}
                  >
                    <Text style={styles.btn_modal_left}>{cancelText}</Text>
                  </TouchableOpacity>
                </View>
              </Screen>
            </View>
          </TouchableOpacity>
          <KeyboardListener
            onWillShow={(e) => this.setState({ keyboardSpacing: e.endCoordinates.height })}
            onWillHide={(e) => {
              this.setState({ keyboardSpacing: 0 });
            }}
            onDidShow={(e) => this.setState({ keyboardSpacing: e.endCoordinates.height })}
            onDidHide={(e) => {
              this.setState({ keyboardSpacing: 0 });
            }}
          />
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

export default DialogInput;
