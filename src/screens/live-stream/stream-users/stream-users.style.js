import { Dimensions, StyleSheet } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  flexFill: {
    flex: 1,
  },
  safeAreaContainer: {
    width: wp(250),
  },

  // header
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    height: wp(60),
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerButtonTouchable: {
    width: wp(40),
    height: wp(40),
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: wp(16),
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
  },
  onlineIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: COLOR.FRIEND_ONLINE_ICON_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIcon: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
  },
  emojiButton: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: "#312446",
    justifyContent: "center",
    alignItems: "center",
  },
  itemColorView: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
  },

  streamTitle: FontHelper.font({
    fontWeight: "600",
    fontSize: wp(16),
    color: "white",
    marginHorizontal: wp(10),
    marginBottom: wp(10),
  }),

  inviteOnlyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: wp(10),
    alignItems: "center",
    paddingVertical: wp(10),
    paddingHorizontal: wp(10),
  },
  inviteOnlyText: {
    color: "white",
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: wp(14),
  },
  inviteOnlySubtext: {
    color: "#ABA7D5",
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: wp(11),
  },
  separator: {
    backgroundColor: "white",
    opacity: 0.15,
    height: wp(1),
    marginBottom: wp(10),
  },

  inviteButtonContainer: {
    marginHorizontal: wp(10),
    paddingHorizontal: wp(10),
  },

  scrollView: {
    marginTop: wp(15),
    flex: 1,
    paddingLeft: wp(10),
  },
  flexRow: {
    flexDirection: "row",
    marginVertical: wp(15),
    alignItems: "center",
  },
  streamerMark: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: COLOR.LIVE_USER_BORDER,
  },
  streamerText: {
    fontSize: wp(16),
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
    paddingHorizontal: wp(5),
  },
  userContainer: {
    flexDirection: "row",
    marginBottom: wp(5),
    alignItems: "center",
  },
  
  broadcasterContainer: {
    flex: 1, 
    height: wp(60), 
    overflow: "hidden",
    marginLeft: wp(10),
  },
  swipeItemContainer: {
    flexDirection: "row",
    height: wp(60),
    alignItems: "center",
  },
  kickBanContainer: {
    width: wp(180),
    position: "absolute",
    right: -wp(180),
    flexDirection: "row",
  },
  muteButton: {
    flex: 1,
    height: wp(60),
    backgroundColor: "#ABA7D5",
    justifyContent: "center",
    alignItems: "center",
  },
  kickButton: {
    flex: 1,
    height: wp(60),
    backgroundColor: "#312446",
    justifyContent: "center",
    alignItems: "center",
  },
  banButton: {
    flex: 1,
    height: wp(60),
    backgroundColor: "#FF0036",
    justifyContent: "center",
    alignItems: "center",
  },
  transparentContainer: {
    width: wp(180),
    height: wp(60),
    flexDirection: "row",
  },
  transparentButton: {
    flex: 1,
    height: wp(60),
  },
  muteButtonText: {
    color: "white",
    fontSize: wp(11),
    fontWeight: "600",
  },
  banButtonText: {
    color: "#0B0516",
    fontSize: wp(11),
    fontWeight: "600",
  },
  streamRemoveIcon: {
    marginRight: wp(10),
  },

  nameTextContainer: {
    flex: 1,
    marginLeft: wp(5),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  nameText: {
    fontSize: wp(14),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
    paddingHorizontal: wp(5),
  },
  badgeImage: {
    width: wp(13),
    height: wp(13),
    marginRight: wp(2),
  },
  usernameText: {
    fontSize: wp(10),
    fontWeight: "700",
    color: COLOR.TEXT_SECONDARY_4,
    paddingHorizontal: wp(5),
  },

  boostContainer: {
    width: wp(60),
    height: wp(60),
    alignSelf: "center",
    marginBottom: wp(20),
  },

  tutorialContainer: {
    flexDirection: "row",
    backgroundColor: "#0B0516",
    position: "absolute",
    right: wp(10),
    top: wp(250),
    width: width - wp(265),
    borderRadius: wp(13),
    paddingHorizontal: wp(11),
    paddingVertical: wp(6),
    alignItems: "center",
  },
  tutorialText: {
    flex: 1,
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(10),
    fontWeight: "600",
  },
  tutorialIcon: {
    width: wp(5),
    height: wp(9),
    resizeMode: "contain",
  },

  askedContainer: {
    paddingHorizontal: wp(8),
    paddingBottom: wp(1),
    backgroundColor: "#617FFF",
    borderRadius: wp(20),
    alignSelf: "flex-start",
    marginTop: -wp(5),
    marginBottom: wp(5),
  },
  askedUserText: {
    fontSize: wp(11),
    fontWeight: "bold",
    color: "white",
  },
  streamAskedContainer: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    marginRight: wp(10),
    backgroundColor: "#617FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  streamAskedIcon: {
    width: wp(16),
    height: wp(16),
    
  },
});
