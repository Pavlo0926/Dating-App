import { Alert } from "react-native";

export class Notification {
  static alert(title = "", message, config, onPress = () => {}) {
    Alert.alert(title, message, [{ text: "OK", onPress: onPress }]);
  }

  static confirmAlert(
    title = "",
    message = "",
    positiveText = "OK",
    cancelText = "Cancel",
    onConfirm = () => {},
    onCancel = () => {},
  ) {
    Alert.alert(
      title,
      message,
      [
        {
          text: cancelText,
          onPress: onCancel,
          style: "cancel",
        },
        { text: positiveText, onPress: onConfirm },
      ],
      { cancelable: false },
    );
  }
}
