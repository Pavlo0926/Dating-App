import { StyleSheet, Dimensions, Platform } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  badgeButtonContainer: {
    padding: wp(20),
  },
  chooseBadgeButton: {
    height: wp(35),
  },
  chooseBadgeText: {
    fontSize: wp(14),
  },

  imageContainer: {
    marginHorizontal: wp(20),
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionText: {
    fontSize: wp(16),
    fontWeight: "bold",
    color: "white",
  },
  bioDoneButton: {
    marginHorizontal: wp(20),
    marginTop: wp(20),
    marginBottom: wp(10),
  },
  imageScrollView: {
    paddingVertical: wp(10),
  },
  imageItem: {
    position: "relative",
  },
  profileImageContainer: {
    paddingTop: wp(10),
  },
  profileImage: {
    width: (width - wp(80)) / 3,
    aspectRatio: 2 / 3,
    borderRadius: wp(22),
    marginLeft: wp(10),
  },
  imageDeleteContainer: {
    position: "absolute",
    top: wp(5),
    right: wp(5),
    backgroundColor: "white",
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    width: wp(10),
    height: wp(3),
  },
  imageLoadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageButton: {
    width: (width - wp(80)) / 3,
    height: (width - wp(80)) / 2,
    borderWidth: wp(2),
    borderColor: "white",
    borderRadius: wp(22),
    backgroundColor: COLOR.HEADER_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp(10),
  },

  settingsContainer: {
    marginTop: wp(20),
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  settingsText: {
    marginHorizontal: wp(20),
    marginTop: wp(20),
    marginBottom: wp(10),
    fontSize: wp(16),
    fontWeight: "bold",
    color: "white",
  },

  bioContainer: {
    backgroundColor: "#211533",
    paddingHorizontal: wp(20),
    paddingVertical: Platform.OS === "ios" ? wp(15) : wp(5),
  },
  bigTextInput: FontHelper.font({
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: wp(14),
    color: COLOR.TEXT_SECONDARY_2,
  }),
  bigTextLength: {
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: wp(14),
    color: COLOR.TEXT_SECONDARY_4,
    textAlign: "right",
  },

  plusContainer: {
    position: "relative",
    alignItems: "center",
    padding: wp(20),
    marginTop: wp(30),
  },
  premiumView: {
    width: width - wp(40),
    height: ((width - wp(40)) * 169) / 336,
    backgroundColor: "#110029",
    borderRadius: wp(22),
    borderWidth: wp(2),
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
    alignItems: "center",
  },
  premiumMask1: {
    position: "absolute",
    left: -wp(162),
    right: -wp(140),
    top: -wp(156),
    bottom: -wp(144),
  },
  premiumMask2: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: wp(200),
  },
  premiumLogo: {
    width: wp(151),
    height: wp(50),
    marginTop: wp(27.4),
  },
  premiumText: {
    color: "white",
    fontSize: wp(14),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(15),
  },
  premiumPlusView: {
    position: "absolute",
    // left: wp(23.4),
    bottom: wp(30),
  },
  premiumPlusImage: {
    
  },
  buttonContainer: {
    width: width - wp(100),
    marginTop: -wp(25),
  },

  amountsContainer: {
    marginTop: wp(60),
    marginBottom: -wp(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  amountSpacer: {
    width: wp(40),
  },
});
