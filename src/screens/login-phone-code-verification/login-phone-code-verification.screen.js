import React from "react";
import { View, Platform, Keyboard } from "react-native";
import { BackButton, GradientButton, Screen, Text } from "@components";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Clipboard from "@react-native-community/clipboard";
import RNOtpVerify from "react-native-otp-verify";
import { Countdown } from "react-native-countdown-text";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import { TUTORIAL } from "@constants";

import styles from "./login-phone-code-verification.style.js";

class LoginPhoneCodeVerification extends React.Component {
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
      RNOtpVerify.getHash().then(console.log).catch(console.log);
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
        this.resetCountdwon(60 - passTime);
      } else {
        this.resendCode();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSendingCode !== this.props.isSendingCode) {
      if (!this.props.isSendingCode) {
        AsyncStorage.setItem(TUTORIAL.SMS_LAST_TIME, `${moment().unix()}`);
        this.resetCountdwon(60);
      }
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      RNOtpVerify.removeListener();
    }
  }

  resetCountdwon = (seconds) => {
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
    this.props.requestPhoneLoginSendCode(phoneNumber, false);
  };

  submit = () => {
    const { phoneNumber, code } = this.state;
    this.props.requestPhoneLoginConfirmCode(phoneNumber, code);
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
                autoFocusOnLoad={true}
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
              text={"Confirm account"}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

export default LoginPhoneCodeVerification;
