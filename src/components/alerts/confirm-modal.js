import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import { Screen } from "../screen";
import { Touchable } from "../touchable";
import { SolidButton } from "../button";
import { Text } from "../text";
import { Format } from "@helpers";

import styles from "./confirm-modal.style";

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user, typeText="block", ...rest} = this.props;
    return (
      <Modal
        {...rest}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.onDismiss}>
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          </Touchable>
        }
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        onModalShow={this.onModalShow}
        onModalWillHide={this.onModalHide}
        style={styles.modalContainer}
        swipeDirection={"down"}
        onSwipeComplete={this.props.onDismiss}
        swipeThreshold={30}
      >
        <View style={styles.container} pointerEvents={"box-none"}>
          <SafeAreaView style={styles.subContainer} pointerEvents={"box-none"}>
            <Screen hasGradient style={styles.contentContainer}>
              <Text style={styles.titleText}>
                {`Are you sure you want to ${typeText} ${user.first_name}?`}
              </Text>

              <SolidButton noShadow
                containerStyle={[styles.buttonContainer, styles.unfriendButton]}
                text={Format.capitalize(typeText)}
                textStyle={styles.buttonText}
                onPress={this.props.onConfirm} />

              <SolidButton noShadow
                containerStyle={[styles.buttonContainer, styles.cancelButton]}
                text={"Cancel"}
                textStyle={styles.buttonText}
                onPress={this.props.onDismiss} />
            </Screen>
          </SafeAreaView>
          
        </View>
      </Modal>
    );
  }
}

export default ConfirmModal;
