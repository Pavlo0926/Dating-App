import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconImage: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    marginRight: wp(10),
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "OpenSans",
    fontSize: wp(14),
    color: "white",
  },
  fullWidth: {
    flex: 1,
  },
  verifyBadge: {
    width: wp(17),
    height: wp(17),
    borderRadius: wp(8.5),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(3),
  },
  verifyBadgeIcon: {
    width: wp(11),
    height: wp(9),
    resizeMode: "contain",
  },
});
