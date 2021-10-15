import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  topActionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(20),
  },
  topRowMargin: {
    marginTop: wp(20),
  },
  topRowMarginSmall: {
    marginTop: wp(8),
  },
  onlineStatus: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    marginHorizontal: wp(5),
  },
  topBarName: {
    fontSize: wp(26),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
  },
  topBarCity: {
    fontSize: wp(12),
    fontFamily: "OpenSans",
    color: COLOR.TEXT_SECONDARY_2,
    marginLeft: wp(5),
  },
  topBarLocation: {
    fontSize: wp(12),
    fontFamily: "OpenSans",
    fontWeight: "700",
    color: COLOR.TEXT_SECONDARY_2,
    marginLeft: wp(3),
  },
  flexSpace: {
    flex: 1,
  },
  infoIcon: {
    width: wp(20),
    height: wp(20),
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: wp(20),
    marginTop: wp(9),
  },
  badgeIcon: {
    width: wp(18),
    height: wp(18),
    marginRight: wp(5),
    marginBottom: wp(5),
  },

  bioText: {
    fontFamily: "OpenSans",
    fontSize: wp(14),
    fontWeight: "400",
    color: "#ABA7D5",
    marginVertical: wp(25),
    marginHorizontal: wp(20),
  },
});
