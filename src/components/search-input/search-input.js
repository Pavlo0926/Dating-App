import React from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Image } from "../image";
import styles from "./search-input.style";

const SearchInput: () => React$Node = prop => {
  return (
    <View style={[styles.searchContainer, prop.containerStyle]}>
      <View style={styles.iconContainer}>
        <Image source={require("@assets/images/search.png")} />
      </View>
      <RNTextInput
        ref={ref => prop.onRef(ref)}
        style={styles.inputField}
        returnKeyType={"search"}
        autoFocus={prop.autoFocus ? true : false}
        placeholder={"search"}
        autoCapitalize={"none"}
        clearButtonMode={"always"}
        onChangeText={text => prop.onSearch(text)}
        allowFontScaling={false}
      />
    </View>
  );
};

export default SearchInput;
