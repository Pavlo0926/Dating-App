import React, { Component } from "react";
import { View, TextInput, Platform, ActivityIndicator } from "react-native";
import { BlurView } from "@react-native-community/blur";
import KeyboardManager from "react-native-keyboard-manager";
import Modal from "react-native-modal";
import { Screen, Touchable, Image, Text, AppAlert } from "@components";
import { report } from "@redux/api";

import Images from "@assets/Images";
import styles from "./report-modal.style";

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeButtons: [
        { id: 1, select: false, text: "Harassment" },
        { id: 2, select: false, text: "Nudity" },
        { id: 3, select: false, text: "I don't like it" },
        { id: 4, select: false, text: "Propaganda" },
        { id: 5, select: false, text: "Other" },
      ],
      msgText: "",
      visibleAlert: false,
      loading: false,
    };
  }

  onInit = () => {
    this.setState({
      typeButtons: [
        { id: 1, select: false, text: "Harassment" },
        { id: 2, select: false, text: "Nudity" },
        { id: 3, select: false, text: "I don't like it" },
        { id: 4, select: false, text: "Propaganda" },
        { id: 5, select: false, text: "Other" },
      ],
      msgText: "",
      visibleAlert: false,
    });
  }

  onModalShow = () => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
    this.onInit();
  };

  onModalHide = () => {
    if (Platform.OS === "ios" && this.props.keyboardDisable) {
      KeyboardManager.setEnable(false);
      KeyboardManager.setShouldResignOnTouchOutside(false);
    }
  };

  onReport = () => {
    let selectedButtons = this.state.typeButtons.filter((button) => button.select === true);
    if (selectedButtons.length > 0) {
      let params = new FormData();
      params.append("reason", selectedButtons[0].id);
      params.append("msg", this.state.msgText);
      let type = "user";
      if (this.props.liveStream) {
        type = "stream";
        params.append("channel_id", this.props.channelId);
      } else {
        params.append("user_id", this.props.userId);
      }
      this.setState({loading: true}, () => {
        report(params, this.props.token, type).then((res) => {
          this.setState({loading: false, visibleAlert: true});
        }).catch(e => {
          this.setState({loading: false});
        });
      });
    }
  };

  onTypeSelect = typeId => {
    const { typeButtons } = this.state;
    typeButtons.forEach(button => {
      if (button.id === typeId) {
        button.select = true;
      } else {
        button.select = false;
      }
    });
    this.setState({ typeButtons });
  };

  renderTypeButtons = () => {
    const { typeButtons } = this.state;
    return typeButtons.map(button => {
      return (
        <Touchable
          key={`type-buttons-${button.id}`}
          style={[styles.typeButton, button.select ? styles.typeButtonSelect : {}]}
          onPress={() => this.onTypeSelect(button.id)}
        >
          <Text style={styles.typeButtonText}>{button.text}</Text>
        </Touchable>
      );
    });
  };

  render() {
    let selectedButtons = this.state.typeButtons.filter((button) => button.select === true);
    let disabledReport = this.state.loading || selectedButtons.length === 0;
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.onDismiss}>
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          </Touchable>
        }
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        onModalShow={this.onModalShow}
        onModalWillHide={this.onModalHide}
        style={styles.modalContainer}
        swipeDirection={"down"}
        onSwipeComplete={this.props.onDismiss}
        swipeThreshold={30}
      >
        <View style={styles.container} pointerEvents={"box-none"}>
          <View style={styles.subContainer} pointerEvents={"box-none"}>
            <Touchable
              style={styles.backButton}
              onPress={() => {
                this.props.onDismiss && this.props.onDismiss();
              }}
            >
              <Image source={Images.app.icBack} style={styles.backImage} />
            </Touchable>
            <Screen hasGradient style={styles.contentContainer}>
              <Text style={styles.titleText}>Report</Text>
              <Text style={styles.descriptionText}>
                {this.props.liveStream
                  ? "Tell us why you want to report this livestream"
                  : "Tell us why you want to report this user"}
              </Text>

              {this.renderTypeButtons()}

              <TextInput
                value={this.state.msgText}
                multiline={true}
                allowFontScaling={false}
                placeholderTextColor={"#ABA7D5"}
                placeholder={"Here you can add additional information..."}
                style={styles.reportContentText}
                onChangeText={(text) => this.setState({msgText: text})}
              />
              <Touchable style={[styles.reportButton]} onPress={this.onReport}
                disabled={disabledReport}>
                {this.state.loading ? (
                  <ActivityIndicator size={"small"} color={"#0B0516"} />
                ) : (
                  <Text style={styles.reportButtonText}>Report</Text>
                )}
              </Touchable>
            </Screen>
          </View>
          <AppAlert 
            isVisible={this.state.visibleAlert}
            onDismiss={() => {
              this.onInit();
              this.props.onDismiss && this.props.onDismiss();
            }}
            title={`You successfully reported this ${this.props.liveStream ? "live" : "user"}.`}
            content={"Thanks. We take an from here."} />
        </View>
      </Modal>
    );
  }
}

export default ReportModal;
