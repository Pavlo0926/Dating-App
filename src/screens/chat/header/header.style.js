import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  header: {
    height: wp(70),
    flexDirection: "row",
  },
  backButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  backButtonTouchable: {
    width: wp(35),
    height: wp(35),
    justifyContent: "center",
    alignItems: "center",
  },
  headerContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    marginRight: wp(10),
  },
  headerNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  headerTitle: {
    fontFamily: "OpenSans",
    fontSize: wp(18),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
    marginRight: wp(5),
  },
  badgeImage: {
    width: wp(14),
    height: wp(14),
    marginRight: wp(3),
  },
  lastSeenText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    fontWeight: "600",
    color: "#ABA7D5",
  },
  activeUser: {
    color: "#00FF77",
  },
  reportButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  reportButtonTouchable: {
    width: wp(35),
    height: wp(35),
    justifyContent: "center",
    alignItems: "center",
  },
  reportIcon: {
    width: wp(16.67),
    height: wp(20),
    resizeMode: "contain",
  },
});
