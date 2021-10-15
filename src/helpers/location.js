import { Linking, PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { Notification } from "./notification";

const hasLocationPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Notification.alert("Unable to open settings");
    });
  };
  const status = await Geolocation.requestAuthorization("whenInUse");

  if (status === "granted") {
    return true;
  }

  if (status === "denied") {
    Notification.alert("Location permission denied");
  }

  if (status === "disabled") {
    Notification.alert(
      `Turn on Location Services to allow Pluzo to determine your location.`,
      "",
      [
        { text: "Go to Settings", onPress: openSetting },
        { text: "Don't Use Location", onPress: () => {} },
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === "ios") {
    const hasPermission = await hasLocationPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === "android" && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show("Location permission denied by user.", ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show("Location permission revoked by user.", ToastAndroid.LONG);
  }

  return false;
};

export const getLocationUpdates = async callback => {
  let hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  return Geolocation.watchPosition(
    position => {
      callback(position);
    },
    error => {
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 100,
      interval: 6000,
      fastestInterval: 10000,
      forceRequestLocation: false,
      showLocationDialog: true,
      useSignificantChanges: false,
    },
  );
};

export const getCurrentLocation = async callback => {
  let hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  return Geolocation.getCurrentPosition(
    position => {
      callback(position);
    },
    error => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  );
};
