import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GradientButton, Text, BackButton, BoxShadow, Touchable, Screen } from "@components";
import { BlurView } from "@react-native-community/blur";
import * as Animatable from "react-native-animatable";
import RNIap from "react-native-iap";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import { widthPercentageToDP as wp, ItemSkus } from "@helpers";

import styles, { screenWidth } from "./puchase-select-modal.style";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

const shadowOptions = {
  width: screenWidth - wp(40),
  height: ((screenWidth - wp(40)) * 375) / 335,
  color: "#FF0000",
  opacity: 0.15,
  _borderRadius: wp(15),
  spread: 0,
  blur: 30,
  offsetX: 0,
  offsetY: 0,
};
const shadowItemOptions = {
  width: wp(95),
  height: wp(140),
  color: "#FF7131",
  opacity: 0.52,
  _borderRadius: wp(15),
  spread: 0,
  blur: 10,
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

class PurchaseSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      activePeriod: 1,
      periods: [
        {period: "1 month", price: "$11.99", saving: ""},
        {period: "3 months", price: "$9.99", saving: "Save 14%"},
        {period: "1 year", price: "$7.99", saving: "Save 28%"}
      ]
    };
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
        propagateSwipe={false}
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
                  {[0, 1, 2].map((value) => {
                    let disabled = this.state.activePeriod !== value;
                    return (
                      <View style={styles.itemContainer} key={`select-period-${value}`}>
                        <BoxShadow
                          setting={shadowItemOptions}
                        />
                        <Touchable onPress={() => this.setState({activePeriod: value})} activeOpacity={1}>
                          <Screen hasGradient style={[styles.itemContentContainer, !disabled && styles.itemActive]}>
                            <Text style={styles.itemPeriodText}>{this.state.periods[value].period}</Text>
                            <Text style={styles.itemPopularText}>{value == 1 ? "Most Popular" : ""}</Text>
                            <Text style={styles.itemSaveText}>{this.state.periods[value].saving}</Text>
                            <Text style={styles.itemPriceText}>{this.state.periods[value].price}</Text>
                            <Text style={styles.itemUnitText}>a month</Text>
                          </Screen>
                        </Touchable>
                        <GradientButton 
                          text={"Select"}
                          textStyle={[styles.selectButtonText, !disabled && styles.itemActiveText]}
                          containerStyle={[styles.selectButton]}
                          colors={disabled ? ["#0B0516", "#1A023E"] : ["#FF7131", "#E0E552"]}
                          shadowColor={"#FF6F00"}
                          disabledButton={false}
                          onPress={() => {
                            if (disabled) {
                              this.setState({activePeriod: value});
                            } else {
                              this.props.onConfirm(this.state.activePeriod);
                            }
                          }} />
                      </View>
                    )
                  })}
                </View>
              </View>

            </LinearGradient>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PurchaseSelectModal;
