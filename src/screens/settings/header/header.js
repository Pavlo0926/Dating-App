import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable } from "@components";
import Images from "@assets/Images";
import styles from "./header.style";

const Header: () => React$Node = props => {
  const { title } = props;
  return (
    <View>
      <View style={styles.headerContainer}>
        <Touchable
          style={styles.backButton}
          onPress={() => {
            if (props.onBack) {
              props.onBack();
            }
          }}
        >
          <Image source={Images.app.icBackLeft} style={styles.backButtonIcon} />
        </Touchable>
      </View>

      {title !== "" && <Text style={styles.settingText}>{title}</Text>}
    </View>
  );
};

export default Header;
