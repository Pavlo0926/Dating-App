import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { Text } from "../text";
import { Image } from "../image";
import styles from "./tab-bar-icon.style";

const TabBarIcon: () => React$Node = props => {
  const tabIcons = {
    live: {
      style: styles.leftSide,
      icon: require("@assets/images/tab-live.png"),
    },
    swipe: {
      style: [styles.centerSide, styles.inactiveContainer],
      icon: require("@assets/images/tab-swipe.png"),
    },
    chat: {
      style: styles.centerSide,
      icon: require("@assets/images/tab-chat.png"),
    },
    profile: {
      style: styles.rightSide,
      icon: require("@assets/images/tab-profile.png"),
    },
  };
  let tabName = props.name.toLowerCase();

  return (
    <View
      style={[
        styles.container,
        props.focused ? tabIcons[tabName].style : styles.inactiveContainer,
      ]}
    >
      <Image
        source={tabIcons[tabName].icon}
        resizeMode={"contain"}
        style={[styles.tabIcon, props.focused ? {} : styles.inactiveText]}
      />
      <Text style={[styles.tabText, props.focused ? {} : styles.inactiveText]}>
        {props.name}
      </Text>
    </View>
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

TabBarIcon.defaultProps = {
  name: "Chat",
};

export default TabBarIcon;
