import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {},
  title: {
    fontSize: wp(14),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
    marginLeft: wp(13),
  },
  friendsList: {
    marginTop: wp(10),
    backgroundColor: "transparent",
  },
  friendsListContentContainerStyle: {
    paddingHorizontal: wp(13),
  },
  itemSeparator: {
    width: wp(10),
  },
  friendItemContainer: {
    paddingHorizontal: wp(5),
    paddingBottom: wp(5),
  },
  friendImage: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(50),
  },
  onlineIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: wp(20),
    height: wp(20),
    borderRadius: wp(20),
    backgroundColor: COLOR.FRIEND_ONLINE_ICON_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
  },
  favouriteIcon: {
    position: "absolute",
    bottom: -wp(9),
    alignSelf: "center",
  },

  imageBlurContainer: {
    width: wp(46),
    height: wp(46),
    borderRadius: wp(23),
    position: "absolute",
    top: wp(2),
    alignSelf: "center",
    overflow: "hidden",
  },
  imageBlur: {
    flex: 1,
  },
  imageBlurView: {
    flex: 1,
    backgroundColor: "#707070",
    opacity: 0.75,
  },
  heartIcon: {
    position: "absolute",
    bottom: wp(15),
    alignSelf: "center",
  },
  greenBorder: {
    borderWidth: wp(2),
    borderColor: "#01FF8D",
  },
  likeCount: {
    color: "#01FF8D",
    fontSize: wp(9),
    fontWeight: "600",
    textAlign: "center",
    marginTop: wp(10),
  },
});
