import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import { request, checkMultiple, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Images from "@assets/Images";

import Header from "../../header";
import styles from "./location-permission.style";

const LocationPermissionScreen: () => React$Node = props => {
  const [locationEnabled, setLocationEnabled] = useState(null);

  useEffect(() => {
    let arrPermissions = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
    if (Platform.OS === "android") {
      arrPermissions = [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
    }
    checkMultiple(arrPermissions).then((statuses) => {
      if (Platform.OS === "ios") {
        console.log(statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
        if (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED) {
          setLocationEnabled("Enabled");
        } else if (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED) {
          setLocationEnabled("Disabled");
        } else {
          setLocationEnabled("Not Requested");
        }
      } else {
        if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
          setLocationEnabled("Enabled");
        } else {
          setLocationEnabled("Disabled");
        }
      }      
    }).catch(e => {
      console.log("Error on checking location", e);
    });
  }, []);

  const renderItem = (title, text, hint) => {
    return (
      <View style={styles.itemPadding}>
        <View style={styles.flexRow}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.valueText}>{text}</Text>
          <Image source={Images.app.icRight} style={styles.arrowIcon} />
        </View>
        {hint !== null && <Text style={styles.hintText}>{hint}</Text>}
      </View>
    );
  };

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={"Location"} onBack={props.navigation.goBack} />

          <Touchable onPress={() => {
            if (locationEnabled === "Not Requested") {
              request(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                if (result === RESULTS.GRANTED) {
                  setLocationEnabled("Enabled");
                } else {
                  setLocationEnabled("Disabled");
                }
              });
            } else {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          }}>
            {renderItem("Manage location access", locationEnabled, null)}
          </Touchable>
          <View style={styles.seperator} />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default LocationPermissionScreen;
