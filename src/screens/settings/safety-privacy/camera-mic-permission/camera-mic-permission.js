import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import { request, checkMultiple, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Images from "@assets/Images";

import Header from "../../header";
import styles from "./camera-mic-permission.style";

const CameraMicPermissionScreen: () => React$Node = props => {
  const [cameraEnabled, setCameraEnabled] = useState(null);
  const [micEnabled, setMicEnabled] = useState(null);

  useEffect(() => {
    let arrPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    if (Platform.OS === "android") {
      arrPermissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO];
    }
    checkMultiple(arrPermissions).then((statuses) => {
      if (Platform.OS === "ios") {
        if (statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) {
          setCameraEnabled("Enabled");
        } else if (statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED) {
          setCameraEnabled("Disabled");
        } else {
          setCameraEnabled("Not Requested");
        }
        if (statuses[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED) {
          setMicEnabled("Enabled");
        } else if (statuses[PERMISSIONS.IOS.MICROPHONE] === RESULTS.BLOCKED) {
          setMicEnabled("Disabled");
        } else {
          setMicEnabled("Not Requested");
        }
      } else {
        if (statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED) {
          setCameraEnabled("Enabled");
        } else {
          setCameraEnabled("Disabled");
        }
        if (statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED) {
          setMicEnabled("Enabled");
        } else {
          setMicEnabled("Disabled");
        }
      }
      
    }).catch(e => {
      console.log("Error on checking camera", e);
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
          <Header title={"Camera and microphone"} onBack={props.navigation.goBack} />

          <Touchable onPress={() => {
            if (cameraEnabled === "Not Requested") {
              request(Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
                if (result === RESULTS.GRANTED) {
                  setCameraEnabled("Enabled");
                } else {
                  setCameraEnabled("Disabled");
                }
              });
            } else {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          }}>
            {renderItem("Manage camera access", cameraEnabled, null)}
          </Touchable>
          <View style={styles.seperator} />
          <Touchable onPress={() => {
            if (micEnabled === "Not Requested") {
              request(Platform.OS === "ios" ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
                if (result === RESULTS.GRANTED) {
                  setMicEnabled("Enabled");
                } else {
                  setMicEnabled("Disabled");
                }
              });
            } else {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          }}>
            {renderItem("Manage microphone access", micEnabled, null)}
          </Touchable>
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default CameraMicPermissionScreen;
