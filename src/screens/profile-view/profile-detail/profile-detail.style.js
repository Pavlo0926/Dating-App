import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    paddingBottom: wp(40),
  },
  topActionRow: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: wp(22),
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
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: wp(15),
    height: wp(15),
  },
  distanceContainer: {
    height: wp(24),
    flexDirection: "row",
    paddingHorizontal: wp(13),
    borderRadius: wp(13),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(10),
  },
  distanceText: {
    fontSize: wp(16),
    fontWeight: "800",
    color: COLOR.TEXT_SECONDARY_3,
  },
  distanceUnit: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    color: COLOR.TEXT_SECONDARY_3,
    marginLeft: wp(2),
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  },
});
