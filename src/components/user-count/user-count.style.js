import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    width: wp(12),
    height: wp(35),
    resizeMode: "contain",
  },
  userCount: {
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
  },
});
