import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  headerButtonTouchable: {
    width: wp(40),
    height: wp(40),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: "white",
    fontSize: wp(14),
    fontWeight: "600",
    paddingHorizontal: wp(10),
  },
});
