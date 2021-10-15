import React from "react";
import { View } from "react-native";
import { Text, IconButton, BoxShadow } from "@components";
import LinearGradient from "react-native-linear-gradient";
import Images from "@assets/Images";
import { widthPercentageToDP as wp } from "@helpers";

import styles from "./profile-amounts.style";

const ProfileAmounts: () => React$Node = props => {
  return (
    <View style={[styles.container, { height: props.barHeight + 30 }]}>
      <LinearGradient
        colors={props.barColors}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[styles.barContainer, { height: props.barHeight }]}
      />

      <View style={styles.iconButtonContainer}>
        <BoxShadow
          setting={{
            width: wp(60),
            height: wp(60),
            color: props.shadowColor,
            opacity: 0.6,
            _borderRadius: wp(30),
            spread: 0,
            blur: 10,
            offsetX: 0,
            offsetY: 0,
          }}
        />
        <IconButton
          backColor={props.tintColor}
          icon={props.icon}
          iconWidth={props.iconWidth}
          iconHeight={props.iconWidth}
          onPress={props.onPress}
        />
        <View style={styles.countCotainer}>
          <Text style={styles.amountText}>{props.amounts}</Text>
        </View>
      </View>
    </View>
  );
};

ProfileAmounts.defaultProps = {
  tintColor: "#D491FF",
  shadowColor: "#6E00FF",
  barColors: ["rgba(212, 145, 255, 0)", "rgba(212, 145, 255, 0.57)"],
  barHeight: 123,
  iconWidth: 27,
  amounts: 3,
  icon: Images.app.icRocket,
};

export default ProfileAmounts;
