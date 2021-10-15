import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { BackButton, Screen, Text, StatesPicker, CountryCodePicker } from "@components";
import Modal from "react-native-modal";

import styles from "./country-selection.style";

const CountrySelection: () => React$Node = props => {
  const [country, setCountry] = useState(null);
  const [states, setStates] = useState("");
  const [currentLoc, setCurrentLoc] = useState(0);
  const [visibleStates, setVisibleStates] = useState(false);
  
  const goBack = () => {
    props.goBack();
  };

  const onModalWillShow = () => {
    setCountry(props.locationData.country);
    setStates(props.locationData.state);
    setCurrentLoc(props.locationData.current);
  }
  
  const onModalWillHide = () => {
    props.onUpdatedLocation(states, country, currentLoc);
  }

  useEffect(() => {
    setCountry(props.locationData.country);
    setStates(props.locationData.state);
    setCurrentLoc(props.locationData.current);
  }, [props.locationData]);

  return (
    <Modal isVisible={props.isVisible}
      onModalWillShow={onModalWillShow}
      onModalWillHide={onModalWillHide}
      style={{margin: 0}}>
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.container}>
          <BackButton onPress={goBack} />
          <Text style={styles.titleText}>Location</Text>

          <View style={styles.locationContainer}>

            {visibleStates &&
            <View style={styles.locationRow} pointerEvents={"box-none"}>
              <Text style={styles.locationRowText}>{"State"}</Text>
              <View style={styles.codePickerContainer}>
                <StatesPicker
                  usState={{name: states ? states : "Alabama"}}
                  onChange={newState => {
                    setStates(newState.name);
                  }}
                  style={styles.codePicker}
                  contentContainerStyle={styles.codePickerContent}
                  spacerStyle={styles.spacerStyle}
                  arrowIcon
                />
              </View>
            </View>}

            <View style={styles.locationRow}>
              <Text style={styles.locationRowText}>{"Country"}</Text>
              <View style={styles.codePickerContainer}>
                <CountryCodePicker
                  country={(currentLoc === 1 || country === null || country === "") ? {iso2: "worldwide", name: "Worldwide"} : { iso2: "", name: country }}
                  onChange={newCountry => {
                    setVisibleStates(newCountry.iso2 === "us");
                    setCountry(newCountry.name);
                    if (newCountry.iso2 === "worldwide") {
                      setCurrentLoc(1);
                    } else {
                      setCurrentLoc(0);
                    }
                  }}
                  style={styles.codePicker}
                  contentContainerStyle={styles.codePickerContent}
                  spacerStyle={styles.spacerStyle}
                  flagStyle={styles.flagStyle}
                  arrowIcon
                  allCountries
                  currentLocation
                />
              </View>
            </View>

          </View>
        </SafeAreaView>
      </Screen>
    </Modal>
  );
};

export default CountrySelection;
