import React, { useState } from "react";
import { View } from "react-native";
import LiveUsers from "../live-users";
import LeftElement from "./left-element";
import RightElement from "./right-element";
import { SCREENS } from "@constants";
import { NavigationService } from "@helpers";

import styles from "./header.style";

const Header: () => React$Node = props => {
  const [isSearchActive, setSearchActive] = useState(false);

  const onSearchPress = () => {
    setSearchActive(!isSearchActive);
    props.onSearch("");
  };

  const onFilterPress = () => {
    NavigationService.navigate(SCREENS.LIVE_FILTER_SETTING, {});
  };

  return (
    <View style={isSearchActive ? styles.bottomMargin : styles.bottomMarginSmall}>
      <View style={styles.header}>
        <LeftElement isSearchActive={isSearchActive}
          onSearch={props.onSearch} />
        <RightElement
          isSearchActive={isSearchActive}
          onSearchPress={onSearchPress}
          onFilterPress={onFilterPress}
        />
      </View>
      {!isSearchActive && <LiveUsers navigation={props.navigation} />}
    </View>
  );
};

export default Header;
