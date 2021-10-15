import React from "react";
import { Image, View } from "react-native";
import {
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  Touchable,
  WheelDatePicker,
} from "@components";
import { Notification } from "@helpers";
import moment from "moment";
import styles from "./signup-birthdate.style.js";

class SignupFirstName extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };
  navigateNext = () => {
    const { birthDate } = this.props;
    let age = moment().diff(moment(birthDate), "years");
    if (Math.abs(age) < 13) {
      Notification.alert("You must be at least 13 years old to make an account");
      return;
    }
    this.props.navigation.navigate("SIGNUP_GENDER_SELECT", {});
  };

  render() {
    const { birthDate } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <ProgressBar width={36} />
          <Touchable onPress={this.goBack}>
            <View style={styles.backButtonContainer}>
              <Image source={require("@assets/images/chevron-left.png")} />
            </View>
          </Touchable>
          <View style={styles.contentContainer}>
            <View style={styles.titleFieldContainer}>
              <Text style={styles.titleText}>When were you born?</Text>
              <WheelDatePicker
                date={birthDate === null ? new Date() : birthDate}
                onDateChange={date => {
                  this.props.setBirthDate(date);
                }}
              />
            </View>

            <View style={styles.buttonContainer}>
              <GradientButton
                disabled={!this.props.birthDate}
                onPress={this.navigateNext}
                text={"Continue"}
              />
            </View>
          </View>
        </View>
      </Screen>
    );
  }
}

export default SignupFirstName;
