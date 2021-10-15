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
import AsyncStorage from "@react-native-community/async-storage";
import { TUTORIAL } from "@constants";

import styles from "./signup-code-verification.style.js";

class SignupCodeVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      canResend: false,
      countdownTime: moment().add(60, "seconds").unix(),
    };
  }

  async componentDidMount() {
    this.codeActionSubscription = EventBus.on(
      UserTypes.PHONE_VERIFICATION_SEND_CODE_SUCCESS,
      () => {
        AsyncStorage.setItem(TUTORIAL.SMS_LAST_TIME, `${moment().unix()}`);
        this.startCountDown(60);
      },
    );
    if (Platform.OS === "android") {
      RNOtpVerify.getOtp()
        .then(p => {
          RNOtpVerify.addListener(this.otpHandler);
        })
        .catch(p => console.log(p));
    }

    let lastTime = 0;
    try {
      lastTime = await AsyncStorage.getItem(TUTORIAL.SMS_LAST_TIME);
    } catch (error) {
      console.log(error);
      lastTime = 0;
    }
    if (lastTime === 0 || lastTime === null) {
      this.resendCode();
    } else {
      let passTime = moment().diff(moment.unix(lastTime), "seconds");
      if (passTime < 60) {
        this.startCountDown(60 - passTime);
      } else {
        this.resendCode();
      }
    }
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
    NavigationService.popToTop();
  };

  resendCode = () => {
    var phoneNumber = "";
    if (this.props.navigation.state.params !== undefined) {
      phoneNumber = this.props.navigation.state.params.phoneNumber;
    }
    this.props.requestPhoneVerificationSendCode(phoneNumber);
  };

  startCountDown = (seconds) => {
    this.setState({
      countdownTime: moment().add(seconds, "seconds").unix(),
      canResend: false,
    });
  };

  submit = () => {
    const { code } = this.state;
    var phoneNumber = "";
    if (this.props.navigation.state.params !== undefined) {
      phoneNumber = this.props.navigation.state.params.phoneNumber;
    }

    this.props.requestPhoneVerificationConfirmCode(phoneNumber, code, true);
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
              text={"Confirm account"}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

export default SignupCodeVerification;
