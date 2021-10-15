import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GradientButton, Text, BackButton, BoxShadow, Touchable, Image } from "@components";
import { BlurView } from "@react-native-community/blur";
import * as Animatable from "react-native-animatable";
import RNIap from "react-native-iap";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import { widthPercentageToDP as wp, ItemSkus } from "@helpers";

import styles, { screenWidth } from "./purchase-modal.style";
import PurchaseSelectModal from "./puchase-select-modal";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

const shadowOptions = {
  width: screenWidth - wp(40),
  height: ((screenWidth - wp(40)) * 480) / 335,
  color: "#FF0000",
  opacity: 0.15,
  _borderRadius: wp(15),
  spread: 0,
  blur: 30,
  offsetX: 0,
  offsetY: 0,
};
const maskAnimation = {
  from: {
    ["translateY"]: 0,
  },
  to: {
    ["translateY"]: -30,
  },
};
const plusAnimation = {
  from: {
    ["translateY"]: -2.5,
  },
  to: {
    ["translateY"]: 2.5,
  },
};

class PurchaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      visibleSelect: false,
    };
  }

  onPurchase = async sku => {
    try {
      await RNIap.requestSubscription(sku);
    } catch (err) {
      console.log(err.code, err.message);
    }
  };

  renderDetails = () => {
    const details = [
      "Access to Profile Badges",
      "Unlimited Swipes",
      "Unlimited Rewinds",
      "Unlimited Friends",
      "5 Super Likes per day",
      "5 Boosts per month",
      "See who likes your profile",
      "Access to hide your age",
      "Access to change your location",
      "No Advertisements",
    ];
    return details.map((detail, index) => {
      return (
        <View style={styles.flexRowDetail} key={index}>
          <Image source={Images.app.pluzoplusTick} style={styles.tickIcon} />
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      )
    })
  }

  render() {
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.onSwipeComplete}>
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={18}
              reducedTransparencyFallbackColor='white'
            />
          </Touchable>
        }
        backdropOpacity={1}
        swipeDirection={"down"}
        swipeThreshold={100}
        useNativeDriver={false}
        propagateSwipe={true}
      >
        <View style={styles.container}>
          <View>
            <BoxShadow
              setting={shadowOptions}
            />
            <LinearGradient
              colors={["#1A023E", "#0C0518", "#110029"]}
              locations={[0, 0.65, 1]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.mainBackground}>
              <AnimatableView
                style={styles.maskContainer}
                animation={maskAnimation}
                iterationCount={"infinite"}
                direction="alternate"
                duration={8000}>
                <FastImage source={Images.app.pluzoplusMask} style={styles.pluzoplusMask} />
              </AnimatableView>

              <BackButton onPress={this.props.onSwipeComplete} />
              <View style={styles.contentContainer} pointerEvents={"box-none"}>
                <View style={styles.logoContainer} pointerEvents={"box-none"}>
                  <FastImage source={Images.app.pluzoplusLogo} style={styles.pluzoplusLogo} />
                  <Text style={styles.descText}>Exclusive features to enhance{"\n"}your experience.</Text>
                </View>

                <View style={styles.detailContainer}>
                  <Text style={styles.includesText}>includes:</Text>
                  {this.renderDetails()}
                </View>

                <Text style={styles.priceText}>{"For $11.99/month"}</Text>
              </View>

            </LinearGradient>
          </View>
          <View style={styles.buttonContainer}>
            <GradientButton
              text={"Purchase"}
              colors={GRADIENT.PURCHASE_BUTTON}
              shadowColor={"#FF6F00"}
              onPress={() => this.setState({visibleSelect: true})}
            />
            <AnimatableView
              animation={plusAnimation}
              iterationCount={"infinite"}
              direction="alternate"
              duration={1500}
              style={styles.plusContainer}
              pointerEvents={"none"}>
              <Image
                source={Images.swipe.pluzoPlusMark}
                pointerEvents={"none"}
                style={styles.plusImage}
              />
            </AnimatableView>
          </View>

          <PurchaseSelectModal 
            isVisible={this.state.visibleSelect}
            onSwipeComplete={() => this.setState({visibleSelect: false})}
            onConfirm={(index) => {
              this.setState({visibleSelect: false});
              this.onPurchase(ItemSkus[index]);
            }}
            />
        </View>
      </Modal>
    );
  }
}

export default PurchaseModal;
