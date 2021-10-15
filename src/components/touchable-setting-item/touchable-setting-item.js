import React, { Component } from "react";
import { Image, View } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles from "./touchable-setting-item.style";

class TouchableSettingItem extends Component {
  render() {
    var { icon, iconUri, verifyBadge, text } = this.props;

    return (
      <Touchable onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          {icon && <Image source={iconUri} style={styles.iconImage} />}
          {!verifyBadge && (
            <Text style={[styles.itemText, styles.fullWidth]}>{text}</Text>
          )}
          {verifyBadge && (
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}>{text}</Text>
              <LinearGradient
                colors={GRADIENT.BUTTON}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={styles.verifyBadge}
              >
                <Image source={Images.app.icCheck} style={styles.verifyBadgeIcon} />
              </LinearGradient>
            </View>
          )}
          <Image source={Images.app.icRight} />
        </View>
      </Touchable>
    );
  }
}

TouchableSettingItem.defaultProps = {
  icon: false,
};

export default TouchableSettingItem;
