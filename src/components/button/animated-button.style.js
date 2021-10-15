import { Dimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  animContainer: {
    position: "absolute",
    top: -wp(2),
    bottom: -wp(2),
    left: wp(17),
    width: width - wp(124),
  },
  animImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  }
});
