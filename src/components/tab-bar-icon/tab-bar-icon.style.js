import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    // backgroundColor: COLOR.TAB_ACTIVE,
    alignItems: "center",
    width: "100%",
    paddingVertical: wp(4),
  },
  inactiveContainer: {
    backgroundColor: COLOR.TAB_INACTIVE,
  },
  centerSide: {
    borderRadius: wp(25),
  },
  leftSide: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: wp(25),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: wp(25),
  },
  rightSide: {
    borderTopLeftRadius: wp(25),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: wp(25),
    borderBottomRightRadius: 0,
  },
  tabIcon: {
    width: wp(20),
    height: wp(18),
  },
  tabText: {
    color: COLOR.TEXT_PRIMARY,
    marginTop: wp(2),
    fontSize: wp(10),
  },
  inactiveText: {
    opacity: 0.5,
  },
});
