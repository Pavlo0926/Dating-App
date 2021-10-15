import React, { Component } from "react";
import { View, Platform, Keyboard } from "react-native";
import { BackButton, GradientButton, ProgressBar, Screen, Text } from "@components";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import RNOtpVerify from "react-native-otp-verify";
import Clipboard from "@react-native-community/clipboard";
import { Countdown } from "react-native-countdown-text";
import moment from "moment";
import EventBus from "eventing-bus";
import { UserTypes } from "@redux/actions";
import { NavigationService } from "@helpers";

import styles from "./update-phone-verification.style";

class UpdatePhoneVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      canResend: false,
      countdownTime: moment().add(60, "seconds").unix(),
    };
  }

  componentDidMount() {
    this.codeActionSubscription = EventBus.on(
      UserTypes.UPDATE_PHONE_SEND_CODE_SUCCESS,
      this.startCountDown,
    );
    this.confirmActionSubscription = EventBus.on(
      UserTypes.UPDATE_PHONE_CONFIRM_CODE_SUCCESS,
      this.goBack,
    );
    if (Platform.OS === "android") {
      RNOtpVerify.getOtp()
        .then(p => {
          RNOtpVerify.addListener(this.otpHandler);
        })
        .catch(p => console.log(p));
    }
    this.resendCode();
  }

  componentWillUnmount() {
    this.codeActionSubscription();
    if (Platform.OS === "android") {
      RNOtpVerify.removeListener();
    }
  }

  otpHandler = message => {
    const otp = /(\d{4})/.exec(message);
    console.log("SMS::", otp);
    if (otp !== null) {
      Clipboard.setString(otp[1]);
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  resendCode = () => {
    var phoneNumber = "";
    if (this.props.navigation.state.params !== undefined) {
      phoneNumber = this.props.navigation.state.params.phoneNumber;
    }
    this.props.requestUpdatePhoneSendCode(phoneNumber, this.props.token);
  };

  startCountDown = () => {
    this.setState({
      countdownTime: moment().add(60, "seconds").unix(),
      canResend: false,
    });
  };

  submit = () => {
    const { code } = this.state;
    var phoneNumber = "";
    if (this.props.navigation.state.params !== undefined) {
      phoneNumber = this.props.navigation.state.params.phoneNumber;
    }

    this.props.requestUpdatePhoneConfirmCode(code, this.props.token);
  };

  render() {
    const { code, countdownTime, canResend } = this.state;
    const { verificationInProgress, isSendingPhoneVerificationCode } = this.props;

    return (
      <Screen>
        <View style={styles.container}>
          <ProgressBar width={100} />
          <BackButton onPress={this.goBack} />
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Phone Verification</Text>
            <Text style={styles.subTitleText}>
              We've sent you a verification code to ensure you are you.
            </Text>

            <View style={styles.codeContainer}>
              <OTPInputView
                codeInputFieldStyle={styles.codeInputStyle}
                style={styles.codeContentContainer}
                pinCount={4}
                autoFocusOnLoad
                onCodeFilled={c => this.setState({ code: c })}
              />
            </View>

            <View style={styles.informationContainer}>
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>Didn't receive it?</Text>
              </View>

              <View style={styles.resendButtonContainer}>
                <GradientButton
                  loading={isSendingPhoneVerificationCode}
                  disabled={!canResend}
                  text={"Resend"}
                  onPress={this.resendCode}
                />
              </View>

              {!canResend ? (
                <View style={styles.instructionContainer}>
                  <Countdown
                    format={"ss"}
                    textStyle={styles.instructionText}
                    finishTime={countdownTime}
                    onFinish={() => this.setState({ canResend: true })}
                  />
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.footer}>
            <GradientButton
              loading={verificationInProgress}
              disabled={!code || code.length < 4}
              onPress={this.submit}
              text={"Confirm Code"}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

export default UpdatePhoneVerification;
