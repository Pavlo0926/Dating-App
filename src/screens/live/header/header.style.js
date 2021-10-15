import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    height: wp(55),
    paddingHorizontal: wp(10),
    alignItems: "center",
  },
  bottomMargin: {
    marginBottom: wp(5),
  },
  bottomMarginSmall: {
    marginBottom: wp(12),
  },
});
