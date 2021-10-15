import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    height: wp(10),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  gradientFill: {
    height: wp(2),
  },
  remainingFill: {
    flex: 1,
    backgroundColor: "white",
    height: wp(2),
  },
  separator: {
    width: wp(4),
  },
});
