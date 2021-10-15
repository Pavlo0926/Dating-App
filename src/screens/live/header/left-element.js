import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, SearchInput } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

import styles from "./left-element.style";

const LeftElement: () => React$Node = props => {
  const [textInput, setTextInput] = useState(props.isSearchActive);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setTextInput(props.isSearchActive);
  }, [props.isSearchActive]);

  return (
    <View style={styles.container}>
      {textInput ? (
        <View style={styles.searchContainer}>
          <SearchInput
            autoFocus
            onSearch={(text) => {
              props.onSearch(text);
            }}
            onRef={ref => {}}
            containerStyle={styles.searchInput}
          />
        </View>
      ) : (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{"Live"}</Text>
          <View style={styles.onlineIconContainer}>
            <LinearGradient
              colors={GRADIENT.FRIEND_ONLINE_ICON}
              from={{ x: 0, y: 0 }}
              to={{ x: 1, y: 0 }}
              style={styles.onlineIcon}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default LeftElement;
