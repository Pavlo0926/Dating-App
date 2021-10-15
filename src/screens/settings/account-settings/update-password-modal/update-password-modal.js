import React, { useState } from "react";
import { View } from "react-native";
import {
  GradientButton,
  Screen,
  BlurView,
  Touchable,
  BackButton,
  TextInput,
} from "@components";
import Modal from "react-native-modal";
import { changePassword } from "@redux/api";
import { Notification } from "@helpers";

import styles from "./update-password-modal.style";

const UpdatePasswordModal: () => React$Node = props => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onUpdatePassword = () => {
    if (oldPass === "" || newPass === "" || confirmPass === "") {
      Notification.alert("Pluzo", "Please enter your passwords correctly");
      return;
    }

    if (newPass !== confirmPass) {
      Notification.alert("Pluzo", "Don't match your new passwords");
      return;
    }

    const params = new FormData();
    params.append("old_pass", oldPass);
    params.append("new_pass", newPass);

    setLoading(true);
    changePassword(params, props.token)
      .then(res => {
        props.updateUserProfile(res.data.data);
        setLoading(false);
        props.onSwipeComplete();
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  const onModalWillShow = () => {
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={props.onSwipeComplete}>
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='#0B0516'
          />
        </Touchable>
      }
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      backdropTransitionOutTiming={0}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      swipeDirection={"down"}
      onSwipeComplete={props.onSwipeComplete}
      onModalWillShow={onModalWillShow}
    >
      <Screen hasGradient style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={props.onSwipeComplete} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={oldPass}
            placeholder={"Old Password"}
            secureTextEntry
            onChangeText={txt => setOldPass(txt)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={newPass}
            placeholder={"New Password"}
            secureTextEntry
            onChangeText={txt => setNewPass(txt)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={confirmPass}
            placeholder={"Confirm Password"}
            secureTextEntry
            onChangeText={txt => setConfirmPass(txt)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            loading={loading}
            containerStyle={styles.button}
            text={"Save"}
            textStyle={styles.buttonText}
            onPress={onUpdatePassword}
          />
        </View>
      </Screen>
    </Modal>
  );
};

export default UpdatePasswordModal;
