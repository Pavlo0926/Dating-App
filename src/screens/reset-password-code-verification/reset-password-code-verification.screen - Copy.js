import React from "react";
import { View, Keyboard, Platform } from "react-native";
import { BackButton, GradientButton, Screen, Text } from "@components";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Clipboard from "@react-native-community/clipboard";
import styles from "./reset-password-code-verification.style.js";
import { Countdown } from "react-native-countdown-text";
import moment from "moment";
import RNOtpVerify from "react-native-otp-verify";
import AsyncStorage from "@react-native-community/async-storage";
import { TUTORIAL } from "@constants";

class ResetPasswordCodeVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      countdownTime: moment().add(0, "seconds").unix(),
      canResend: false,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
    };
  }

  async componentDidMount() {
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
        this.resetCountdown(60 - passTime);
      } else {
        this.resendCode();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSendingCode !== this.props.isSendingCode &&
      this.props.isSendingCode === false
    ) {
      AsyncStorage.setItem(TUTORIAL.SMS_LAST_TIME, `${moment().unix()}`);
      this.resetCountdown(60);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      RNOtpVerify.removeListener();
    }
  }

  resetCountdown = (seconds) => {
    this.setState({
      canResend: false,
      countdownTime: moment().add(seconds, "seconds").unix(),
    });
  };

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
    const { phoneNumber } = this.state;
    this.props.requestForgotPasswordSendCode(phoneNumber, false);
  };

  submit = () => {
    const { code, phoneNumber } = this.state;
    this.props.requestForgotPasswordConfirmCode(phoneNumber, code);
  };

  render() {
    const { canResend, countdownTime } = this.state;
    return (
      <Screen>
        <View style={styles.container}>
          <BackButton onPress={this.goBack} />
          <View style={styles.contentContainer} pointerEvents={"box-none"}>
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
                  disabled={!canResend}
                  loading={this.props.isSendingCode}
                  onPress={this.resendCode}
                  text={"Resend"}
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
              loading={this.props.verificationInProgress}
              onPress={this.submit}
              text={"Change password"}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

export default ResetPasswordCodeVerification;
