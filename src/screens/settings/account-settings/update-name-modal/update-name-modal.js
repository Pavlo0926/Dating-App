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

import styles from "./update-name-modal.style";

const UpdateNameModal: () => React$Node = props => {
  const [name, setName] = useState(props.user.first_name);

  const onUpdateName = () => {
    const params = new FormData();
    params.append("first_name", name);
    props.updateUser(params, props.token);

    props.onSwipeComplete();
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
    >
      <Screen hasGradient style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={props.onSwipeComplete} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            placeholder={"Name"}
            onChangeText={txt => setName(txt)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            containerStyle={styles.button}
            text={"Save"}
            textStyle={styles.buttonText}
            onPress={onUpdateName}
          />
        </View>
      </Screen>
    </Modal>
  );
};

export default UpdateNameModal;
