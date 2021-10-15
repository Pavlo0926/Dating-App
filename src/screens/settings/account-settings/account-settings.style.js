import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemPadding: {
    paddingHorizontal: wp(20),
    paddingVertical: wp(15),
  },
  titleText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(14),
    flex: 1,
  },
  valueText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(12),
  },
  arrowIcon: {
    marginLeft: wp(12),
  },

  seperator: {
    height: wp(1),
    backgroundColor: "#FFFFFF",
    opacity: 0.15,
  },
  emptyRow: {
    height: wp(20),
  },
});
