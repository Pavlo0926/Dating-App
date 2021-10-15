import { Dimensions, PixelRatio } from "react-native";

// Retrieve initial screen's width
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

let staticHeight = 667;
let staticWidth = 375;

const widthPercentageToDP = widthPercent => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((elemWidth * screenWidth) / staticWidth);
};

const heightPercentageToDP = heightPercent => {
  const elemHeight =
    typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((elemHeight * screenHeight) / staticHeight);
};

export { widthPercentageToDP, heightPercentageToDP };
