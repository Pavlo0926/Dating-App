import React, { useState, useEffect } from "react";
import { View, ScrollView, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Touchable } from "../touchable";
import { Image } from "../image";
import { Text } from "../text";
import Images from "@assets/Images";

import styles from "./country-code-picker.style";

export const countries = require("./countries.json");

const CountryCodePicker: () => React$Node = props => {
  const {
    spacerStyle=styles.spacer,
    arrowIcon=false,
    allCountries = false,
    currentLocation = false,
  } = props;
  let arrCountries = [...countries];
  if (allCountries) {
    arrCountries = [{
      name: "Worldwide",
      iso2: "worldwide",
      dialCode: "",
      priority: 0,
      areaCodes: null,
    }, ...countries];
  }

  let initialCountry = props.country;
  if (props.country.iso2 === "") {
    initialCountry = arrCountries.filter((value) => value.name === props.country.name)[0]
  }
  const [showPicker, setShowPicker] = useState(false);
  const [country, setCountry] = useState(initialCountry);
  const [visibility] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(visibility, {
      toValue: showPicker ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [showPicker, visibility]);

  useEffect(() => {
    !props.noFirst && props.onChange && props.onChange(country);
  }, [country, props]);

  return (
    <View style={styles.container}>
      <Touchable
        style={[styles.currentItem, props.style]}
        onPress={() => {
          setShowPicker(!showPicker);
        }}
      >
        {country.iso2 === "worldwide" && currentLocation &&
        <Text style={styles.currentLocationText1}>Current Location</Text>}
        {country.iso2 !== "worldwide" && currentLocation &&
          <Image
            source={Images.flags[country === undefined ? "us" : country.iso2]}
            style={[styles.flag, props.flagStyle]}
          />}
        {!currentLocation &&
        <Image
          source={Images.flags[country === undefined ? "us" : country.iso2]}
          style={[styles.flag, props.flagStyle]}
        />}
        {arrowIcon && <View style={styles.arrowDown}/>}
      </Touchable>
      {showPicker && (
        <Animated.View
          style={[
            styles.contentContainer,
            props.contentContainerStyle,
            {
              opacity: visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  scale: visibility.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={spacerStyle} />
          <ScrollView>
            {arrCountries.map(item => {
              return (
                <Touchable
                  key={item.name}
                  style={styles.itemContainer}
                  onPress={() => {
                    setCountry(item);
                    setShowPicker(false);
                    props.noFirst && props.onChange && props.onChange(item);
                  }}
                >
                  {item.iso2 === "worldwide" && currentLocation &&
                  <Text style={styles.currentLocationText}>Current Location</Text>}
                  {item.iso2 !== "worldwide" && currentLocation &&
                  <Image source={Images.flags[item.iso2]} style={[styles.flag, props.flagStyle]} />}
                  {!currentLocation &&
                  <Image source={Images.flags[item.iso2]} style={[styles.flag, props.flagStyle]} />}
                </Touchable>
              );
            })}
          </ScrollView>
          <LinearGradient
            colors={["rgba(171, 167, 213, 1)", "rgba(171, 167, 213, 0)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.bottomFade}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default CountryCodePicker;
