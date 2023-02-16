import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginBottom: wp(50),
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: wp(20),
  },
  swiperWrapper: {
    marginBottom: wp(15),
  },
  swiperContainer: {
    height: (screenWidth - wp(20)) / 2 + wp(15),
  },
  swiperPagenation: {
    bottom: 0,
  },
  swiperDot: {
    width: wp(20),
    height: wp(2),
    marginHorizontal: wp(5),
    backgroundColor: "white",
  },
  swiperActiveDot: {
    width: wp(20),
    height: wp(2),
    marginHorizontal: wp(5),
  },

  itemContainer: {
    flexDirection: "column",
    backgroundColor: COLOR.LIVE_ITEM_BACKGROUND,
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
    borderTopLeftRadius: wp(22),
    borderTopRightRadius: wp(22),
    overflow: "hidden",
    marginHorizontal: wp(5),
    marginBottom: wp(10),
  },
  itemDataContainer: {
    margin: wp(10),
  },
  userName: {
    fontSize: wp(12),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    paddingRight: wp(15),
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  membersContainer: {
    height: wp(18),
    flexDirection: "row",
    paddingHorizontal: wp(6),
    borderRadius: wp(9),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(5),
  },
  memberIcon: {
    width: wp(12),
    height: wp(12),
    resizeMode: "contain",
  },
  memberCount: {
    fontSize: wp(12),
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
    paddingLeft: wp(2),
  },
  tagImages: {
    flexDirection: "row",
  },
  tagImage: {
    width: wp(13),
    height: wp(13),
    marginRight: wp(5),
  },

  masonryContainer: {
    marginHorizontal: wp(5),
  },

  // Fav
  favContainer: {
    position: "absolute",
    right: wp(20),
    bottom: wp(70),
  },
  plusFav: {
    width: wp(60),
    height: wp(60),
    borderRadius: wp(30),
    alignItems: "center",
    justifyContent: "center",
  },
  favGray: {
    backgroundColor: "grey",
  },
});
