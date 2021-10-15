import React, { useState } from "react";
import { View } from "react-native";
import { Text, BoxShadow, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";

import styles from "./price-box-view.style";

const PriceBoxView: () => React$Node = props => {
  const { selected, colors, selectColors, shadowColor } = props;
  const [boxWidth, setBoxWidth] = useState(1);
  const [boxHeight, setBoxHeight] = useState(1);

  const boxShadowOpt = {
    width: boxWidth,
    height: boxHeight,
    color: shadowColor,
    opacity: 0.6,
    _borderRadius: 22,
    spread: 0,
    blur: 10,
    offsetX: 0,
    offsetY: 0,
  };

  return (
    <Touchable
      style={styles.container}
      onPress={() => props.onSelect && props.onSelect()}
    >
      <View style={[styles.selectContainer, selected ? styles.selected : {}]}>
        <Text style={styles.priceText}>{`$${props.price}/ea`}</Text>
      </View>
      {selected && <BoxShadow setting={boxShadowOpt} />}
      <LinearGradient
        colors={selected ? selectColors : colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.boxContainer}
        onLayout={e => {
          setBoxWidth(e.nativeEvent.layout.width);
          setBoxHeight(e.nativeEvent.layout.height);
        }}
      >
        <View style={[styles.boxContentContainer, selected && styles.selectedBorder]}>
          <Text
            style={[
              styles.countText,
              selected ? styles.selectedColor : styles.unselectedColor,
            ]}
          >
            {props.count}
          </Text>
          <Text
            style={[
              styles.boxTitle,
              selected ? styles.selectedColor : styles.unselectedColor,
            ]}
          >
            {props.boxTitle}
          </Text>

          {props.saveValue && (
            <View style={styles.saveTextContainer}>
              <Text style={styles.saveText}>{`SAVE ${props.saveValue}%`}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </Touchable>
  );
};

PriceBoxView.defaultProps = {
  colors: ["#312446", "#400D74"],
  selectColors: ["#D491FF", "#8F00E9"],
  shadowColor: "#6E00FF",
  shadow: false,
  boxBorder: 0,
  count: 1,
  boxTitle: "Boost",
  price: "6.99",
  selected: false,
};

export default PriceBoxView;
