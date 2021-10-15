import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  dot: {
    width: wp(6),
    height: wp(6),
    marginHorizontal: wp(1.5),
    borderRadius: wp(3),
    backgroundColor: "white",
  }
});
