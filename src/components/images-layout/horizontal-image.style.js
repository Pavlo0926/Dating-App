import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  container: {
    flexWrap: "wrap",
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
    overflow: "hidden",
  },
  imageOne: {
    resizeMode: "cover",
    width: screenWidth - wp(20),
    height: (screenWidth - wp(20)) / 2,
  },
});
