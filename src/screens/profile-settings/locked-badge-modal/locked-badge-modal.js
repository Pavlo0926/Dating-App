import React, { useState } from "react";
import { View } from "react-native";
import { Screen, Text, BoxShadow, GradientButton, Touchable } from "@components";
import * as Animatable from "react-native-animatable";
import { BlurView } from "@react-native-community/blur";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";
import { GRADIENT } from "@config";
import { AppBadges } from "@config";
import Images from "@assets/Images";

import styles from "./locked-badge-modal.style";

const plusAnimation = {
  from: {
    ["translateY"]: -2.5,
  },
  to: {
    ["translateY"]: 2.5,
  },
};

const LockedBadgeModal: () => React$Node = props => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  let backShadowOpt = {
    width: width,
    height: height,
    color: "#0B0516",
    opacity: 0.5,
    _borderRadius: 20,
    spread: 0,
    blur: 20,
    offsetX: 0,
    offsetY: 6,
  };

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={props.onBack}>
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={18}
            reducedTransparencyFallbackColor='white'
          />
        </Touchable>
      }
      backdropOpacity={1}
      useNativeDriver={false}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      swipeDirection={"down"}
      onSwipeComplete={props.onBack}
    >
      <View
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <BoxShadow setting={backShadowOpt} />
        <Screen hasGradient style={styles.container}>
          <FastImage 
            source={Images.app.badgeLockedMask}
            style={styles.backgroundCircle}/>
          <Text style={styles.titleText}>{"Badges are locked."}</Text>
          <View style={styles.badgesContainer}>
            {
              [1, 2, 3, 4, 5].map((item) => {
                return (
                  <View
                    key={`profile-badge-${item}`}
                    style={styles.badgeIconContainer}
                  >
                    <FastImage style={styles.badgeIcon} source={Images.badges[AppBadges[item-1].id]}/>
                  </View>
                )
              })
            }
          </View>
          <Text style={styles.messageText}>Unlock all badges.</Text>
          <View style={styles.buttonContainer}>
            <GradientButton
              text={"Get Pluzo Plus"}
              colors={GRADIENT.PURCHASE_BUTTON}
              shadowColor={"#FF6F00"}
              onPress={() => props.onPurchase()}
            />
            <Animatable.View
              animation={plusAnimation}
              iterationCount={"infinite"}
              direction="alternate"
              duration={1500}
              style={styles.plusContainer}
              pointerEvents={"none"}>
              <FastImage
                source={Images.swipe.pluzoPlusMark}
                pointerEvents={"none"}
                style={styles.plusImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Animatable.View>
          </View>
        </Screen>
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <FastImage source={Images.app.icStar} 
              style={styles.logoIcon} 
              tintColor={"#ABA7D5"}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LockedBadgeModal;
