import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  iconSize: {
    width: wp(20),
    height: wp(20),
  },
});
