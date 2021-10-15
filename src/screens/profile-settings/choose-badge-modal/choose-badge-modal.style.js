import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    borderRadius: wp(22),
  },
  headerContainer: {
    paddingLeft: wp(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontWeight: "bold",
    color: "white",
    fontSize: wp(16),
  },

  myBadgeScroll: {
    backgroundColor: COLOR.SEARCH_INPUT_BORDER,
    height: 58,
  },
  scrollContentCenter: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  myBadgeContainer: {
    width: wp(52),
    height: wp(36),
    alignItems: "center",
  },
  myBadgeView: {
    width: wp(36),
    height: wp(36),
    borderRadius: wp(18),
    backgroundColor: COLOR.HEADER_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    width: wp(16),
    height: wp(16),
    resizeMode: "contain",
  },
  // badgeImage: {
  //   fontSize: wp(12),
  // },
  badgeActive: {
    backgroundColor: "white",
  },

  noteText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: COLOR.TEXT_SECONDARY_4,
    paddingHorizontal: wp(50),
    paddingVertical: wp(8),
    textAlign: "center",
  },
  separatorLine: {
    height: wp(1),
    backgroundColor: "white",
    opacity: 0.15,
    marginVertical: wp(8),
  },

  allBadgeScroll: {
    height: wp(250),
  },
  flexWrap: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  allBadgeItem: {
    width: (screenWidth - wp(42)) / 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: wp(5),
  },
  badgeWrapper: {
    width: wp(30),
    height: wp(30),
    justifyContent: "center",
    alignItems: "center",
  },
  badgeSelectedWrapper: {
    width: wp(30),
    height: wp(30),
    borderTopLeftRadius: wp(15),
    borderTopRightRadius: wp(15),
    borderBottomLeftRadius: wp(15),
    borderBottomRightRadius: wp(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312466",
  },

  badgeText: {
    color: "white",
    fontSize: wp(12),
    fontWeight: "600",
    marginLeft: ((screenWidth - wp(42)) / 6 - wp(30)) / 2,
  },
  badgePlusText: {
    color: "white",
    fontSize: wp(12),
    fontWeight: "600",
    marginLeft: ((screenWidth - wp(42)) / 6 - wp(30)) / 2,
    marginTop: wp(28),
  },
  badgePlusMask: {
    backgroundColor: "#0B0516",
    opacity: 0.5,
    position: "absolute",
    left: 0, 
    right: 0,
    top: wp(5),
    bottom: -wp(300),
  },

  buttonContainer: {
    position: "absolute",
    left: wp(17.5),
    right: wp(17.5),
    bottom: wp(25),
    color: "white",
  },
  plusContainer: {
    position: "absolute",
    top: -wp(2),
    bottom: -wp(2),
    alignSelf: "center",
    width: screenWidth - wp(145),
  },
  plusImage: {
    width: "100%",
    height: "100%",
  },
});
