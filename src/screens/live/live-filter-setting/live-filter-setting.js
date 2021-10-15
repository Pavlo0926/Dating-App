import React, { useEffect, useState, useRef } from "react";
import { View, SafeAreaView } from "react-native";
import { TransitionPresets } from "react-navigation-stack";
import {
  BlurView,
  BackDownButton,
  Screen,
  Text,
  Image,
  Touchable,
  GradientButton,
  CountryCodePicker,
  StatesPicker,
  countries,
} from "@components";
import Images from "@assets/Images";

import styles from "./live-filter-setting.style";

const LiveFilterSetting: () => React$Node = props => {
  const [visibleLocation, setVisibleLocation] = useState(false);
  const [visibleStates, setVisibleStates] = useState(false);
  const [liveSettings, setLiveSetttings] = useState(props.settings ? props.settings : {filter: 0, country: "Worldwide", state: "Alabama"});
  const updatedValue = useRef(null);

  const goBack = () => {
    if (visibleLocation) {
      setVisibleLocation(false);
    } else {
      props.navigation.goBack();
    }
  };

  const getFlag = (settings) => {
    if (settings === null) {
      return Images.flags["worldwide"];
    }

    let filterCountries = countries.filter((value) => value.name === settings.country);
    if (filterCountries.length > 0) {
      return Images.flags[filterCountries[0].iso2];
    }

    return Images.flags["worldwide"];
  }

  const onUpdateFilter = (newFilter) => {
    setLiveSetttings({filter: newFilter, country: liveSettings.country, state: liveSettings.state});
  }

  useEffect(() => {
    props.getFilterSettings(props.token);
    return () => {
      props.setFilterSettings(updatedValue.current, props.token);
    }
  }, []);

  useEffect(() => {
    updatedValue.current = liveSettings;
  }, [liveSettings]);

  useEffect(() => {
    if (props.settings !== null) {
      setLiveSetttings({filter: props.settings.filter, country: props.settings.country, state: props.settings.state === null ? "Alabama" : props.settings.state});
      if (props.settings.country === "United States") {
        setVisibleStates(true);
      }
    }
  }, [props.settings]);

  const renderSortTypes = () => {
    const sortTypes = ["Friends", "Participants", "Distance"];
    return sortTypes.map((item, index) => {
      return (
        <Touchable
          key={`sort-by-${index}`}
          style={styles.itemContainer}
          onPress={() => onUpdateFilter(index)}
        >
          <Text style={styles.itemText}>{item}</Text>
          {(liveSettings.filter === index) ? (
            <View>
              <GradientButton containerStyle={styles.sortSelection} />
            </View>
          ) : (
            <View style={styles.sortNoSelection} />
          )}
        </Touchable>
      );
    });
  };
  console.log(liveSettings.state);
  return (
    <View style={styles.container}>
      <Touchable style={styles.absoluteFill}
        onPress={() => goBack()}>
        <BlurView />
      </Touchable>
      <SafeAreaView style={styles.contentContainer} pointerEvents={"box-none"}>
        <BackDownButton onPress={goBack} />
      </SafeAreaView>

      <Screen hasGradient style={styles.filterContainer}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Live-Filter</Text>

          <Text style={styles.subTitleText}>Location</Text>
          <Touchable
            style={styles.itemContainer}
            onPress={() => {
              setVisibleLocation(true);
            }}
          >
            <Text style={styles.itemText}>Country</Text>
            <Text style={styles.countryName}>{liveSettings.country}</Text>
            <Image
              source={getFlag(liveSettings)}
              style={styles.flagIcon}
            />
            <Image source={Images.app.icRight} />
          </Touchable>
          
          <View style={styles.seperator} />

          <Text style={styles.subTitleText}>Filter by</Text>
          {renderSortTypes()}
          
        </SafeAreaView>
      </Screen>

      {visibleLocation &&
      <Screen hasGradient style={styles.filterContainer}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Location</Text>
          <View style={styles.locationContainer}>

            {visibleStates &&
            <View style={styles.locationRow} pointerEvents={"box-none"}>
              <Text style={styles.locationRowText}>{"State"}</Text>
              <View style={styles.codePickerContainer}>
                <StatesPicker
                  usState={{name: liveSettings.state}}
                  onChange={newState => {
                    setLiveSetttings({country: liveSettings.country, filter: liveSettings.filter, state: newState.name});
                  }}
                  style={styles.codePicker}
                  contentContainerStyle={styles.codePickerContent}
                  spacerStyle={styles.spacerStyle}
                  arrowIcon
                  noFirst
                />
              </View>
            </View>}

            <View style={styles.locationRow}>
              <Text style={styles.locationRowText}>{"Country"}</Text>
              <View style={styles.codePickerContainer}>
                <CountryCodePicker
                  country={(liveSettings.country) ? { iso2: "", name: liveSettings.country } : { iso2: "", name: "Worldwide"}}
                  onChange={newCountry => {
                    setVisibleStates(newCountry.iso2 === "us");
                    setLiveSetttings({country: newCountry.name, filter: liveSettings.filter, state: liveSettings.state});
                  }}
                  style={styles.codePicker}
                  contentContainerStyle={styles.codePickerContent}
                  spacerStyle={styles.spacerStyle}
                  flagStyle={styles.flagStyle}
                  arrowIcon
                  allCountries
                  noFirst
                />
              </View>
            </View>

          </View>
        </SafeAreaView>
      </Screen>}
    </View>
  );
};

LiveFilterSetting.navigationOptions = {
  ...TransitionPresets.FadeFromBottomAndroid,
};

export default LiveFilterSetting;
