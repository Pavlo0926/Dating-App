import React from "react";
import { View, SafeAreaView } from "react-native";
import { Image, Text, Touchable } from "@components";
import { SCREENS } from "@constants";
import Images from "@assets/Images";
import styles from "./header.style";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  onSettings = () => {
    this.props.navigation.navigate(SCREENS.SETTINGS);
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerContentContainer}>
              <Text style={styles.headerTitle}>{""}</Text>
            </View>
            <View style={styles.reportButtonContainer}>
              <Touchable style={styles.reportButtonTouchable} onPress={this.onSettings}>
                <Image source={Images.app.icSetting} style={styles.settingIcon} />
              </Touchable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default Header;
