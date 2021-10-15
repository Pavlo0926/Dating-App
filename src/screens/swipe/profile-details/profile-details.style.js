import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: wp(60),
    marginBottom: wp(90),
    marginHorizontal: wp(15),
    borderRadius: wp(22),
    paddingHorizontal: wp(15),
    paddingTop: wp(40),
    paddingBottom: wp(20),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowMarginTop: {
    marginTop: wp(5),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonNormal: {
    width: wp(70),
    height: wp(70),
  },
  buttonSmall: {
    width: wp(50),
    height: wp(50),
  },
  largeText: {
    fontSize: wp(26),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
  },
  smallText: {
    fontSize: wp(10),
    color: COLOR.TEXT_SECONDARY_2,
    marginLeft: wp(5),
  },
  descriptionText: {
    fontSize: wp(12),
    color: COLOR.TEXT_SECONDARY_4,
  },
  onlineStatus: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    marginHorizontal: wp(5),
  },
  flexSpace: {
    flex: 1,
  },
  followerContainer: {
    height: wp(24),
    flexDirection: "row",
    paddingHorizontal: wp(13),
    borderRadius: wp(13),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(12),
  },
  followerCount: {
    fontSize: wp(16),
    fontWeight: "800",
    color: COLOR.TEXT_SECONDARY_3,
  },
  followerUnit: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    color: COLOR.TEXT_SECONDARY_3,
    marginLeft: wp(2),
  },
  descriptionContainer: {
    flex: 1,
    paddingVertical: wp(20),
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
});
