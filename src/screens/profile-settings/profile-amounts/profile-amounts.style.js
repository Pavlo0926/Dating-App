import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    width: wp(60),
    flexDirection: "column-reverse",
  },

  iconButtonContainer: {
    width: wp(60),
    height: wp(60),
  },

  barContainer: {
    top: wp(30),
  },

  countCotainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    minWidth: wp(22),
    height: wp(22),
    backgroundColor: "white",
    borderRadius: wp(11),
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    fontFamily: "OpenSans",
    fontSize: wp(14),
    fontWeight: "700",
    color: "#0B0516",
  },
});
