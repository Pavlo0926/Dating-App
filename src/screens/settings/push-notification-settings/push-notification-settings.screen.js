import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { Screen, Text } from "@components";
import { Switch } from "react-native-switch";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Header from "../header";

import styles from "./push-notification-settings.style";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

class PushNotificationSettings extends Component {
  constructor(props) {
    super(props);
    const { user_setting } = this.props.user;
    console.log(user_setting);
    this.state = {
      newFriends: user_setting.push_new_friend === 1 ? true : false,
      requestFriend: user_setting.push_friend_request === 1 ? true : false,
      live: user_setting.push_live === 1 ? true : false,
      message: user_setting.push_message === 1 ? true : false,
    }
  }

  componentWillUnmount() {
    const { newFriends, requestFriend, live, message } = this.state;

    const params = new FormData();
    params.append("push_new_friend", newFriends ? 1 : 0);
    params.append("push_friend_request", requestFriend ? 1 : 0);
    params.append("push_live", live ? 1 : 0);
    params.append("push_new_friend", message ? 1 : 0);
    this.props.updateUser(params, this.props.token);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { newFriends, requestFriend, live, message } = this.state;
    
    return (
      <Screen
        hasGradient
        style={this.props.isModal ? styles.modalContainer : styles.container}
      >
        <SafeAreaView style={this.props.isModal ? {} : styles.safeAreaContainer}>
          <View>
            <Header title={"Push notifications"} onBack={this.goBack} />
            
            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>New Friends</Text>
              <Switch
                value={newFriends}
                onValueChange={val => {
                  this.setState({ newFriends: val });
                  ReactNativeHapticFeedback.trigger("impactLight", options);
                }}
                circleSize={20}
                barHeight={24}
                circleBorderWidth={0}
                backgroundActive={"#617FFF"}
                backgroundInactive={"#ABA7D5"}
                circleActiveColor={"white"}
                circleInActiveColor={"white"}
                renderActiveText={false}
                renderInActiveText={false}
                switchBorderRadius={12}
                switchWidthMultiplier={2.2}
              />
            </View>
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Friend request</Text>
              <Switch
                value={requestFriend}
                onValueChange={val => {
                  this.setState({ requestFriend: val });
                  ReactNativeHapticFeedback.trigger("impactLight", options);
                }}
                circleSize={20}
                barHeight={24}
                circleBorderWidth={0}
                backgroundActive={"#617FFF"}
                backgroundInactive={"#ABA7D5"}
                circleActiveColor={"white"}
                circleInActiveColor={"white"}
                renderActiveText={false}
                renderInActiveText={false}
                switchBorderRadius={12}
                switchWidthMultiplier={2.2}
              />
            </View>
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Live</Text>
              <Switch
                value={live}
                onValueChange={val => {
                  this.setState({ live: val });
                  ReactNativeHapticFeedback.trigger("impactLight", options);
                }}
                circleSize={20}
                barHeight={24}
                circleBorderWidth={0}
                backgroundActive={"#617FFF"}
                backgroundInactive={"#ABA7D5"}
                circleActiveColor={"white"}
                circleInActiveColor={"white"}
                renderActiveText={false}
                renderInActiveText={false}
                switchBorderRadius={12}
                switchWidthMultiplier={2.2}
              />
            </View>
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Message</Text>
              <Switch
                value={message}
                onValueChange={val => {
                  this.setState({ message: val });
                  ReactNativeHapticFeedback.trigger("impactLight", options);
                }}
                circleSize={20}
                barHeight={24}
                circleBorderWidth={0}
                backgroundActive={"#617FFF"}
                backgroundInactive={"#ABA7D5"}
                circleActiveColor={"white"}
                circleInActiveColor={"white"}
                renderActiveText={false}
                renderInActiveText={false}
                switchBorderRadius={12}
                switchWidthMultiplier={2.2}
              />
            </View>
            <View style={styles.separator} />
          </View>
        </SafeAreaView>
      </Screen>
    );
  }
}

export default PushNotificationSettings;
