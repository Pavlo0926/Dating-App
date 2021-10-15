import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import { Screen, Touchable, SolidButton, Text } from "@components";

import styles from "./user-setting-modal.style";

class UserSettingModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user, isFriend=true, ...rest} = this.props;
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
                {`Anything wrong with ${user.first_name}?`}
              </Text>

              {isFriend &&
              <SolidButton noShadow
                containerStyle={[styles.buttonContainer, styles.unfriendButton]}
                text={"Unfriend"}
                textStyle={styles.buttonText}
                onPress={() => {
                  this.props.onDismiss();
                  this.props.onUnfriend();
                }} />}
              
              <SolidButton noShadow
                containerStyle={[styles.buttonContainer, styles.blockButton]}
                text={"Block"}
                textStyle={styles.buttonText}
                onPress={() => {
                  this.props.onDismiss();
                  this.props.onBlock();
                }} />
              
              <SolidButton noShadow
                containerStyle={[styles.buttonContainer, styles.blockButton]}
                text={"Report"}
                textStyle={styles.buttonText}
                onPress={() => {
                  this.props.onDismiss();
                  this.props.onReport();
                }} />
              
              <View style={styles.seperator} />
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

export default UserSettingModal;
