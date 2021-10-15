import React from "react";
import { View } from "react-native";
import { Text } from "../text";
import { Image } from "../image";
import { Touchable } from "../touchable";
import Images from "@assets/Images";

import styles from "./modal-header.style";

const ModalHeader: () => React$Node = props => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Touchable
          style={styles.backButton}
          onPress={() => {
            if (props.onDismiss) {
              props.onDismiss();
            }
          }}
        >
          <Image source={Images.app.icBackLeft} style={styles.backButtonIcon} />
        </Touchable>
      </View>

      <Text style={styles.settingText}>{props.title}</Text>
    </View>
  );
};

export default ModalHeader;
