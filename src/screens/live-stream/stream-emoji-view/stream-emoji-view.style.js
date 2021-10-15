import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    borderRadius: wp(22),
    overflow: "hidden",
    marginBottom: wp(20),
  },
  allContainer: {
    height: wp(160) + (width - wp(275)) / 2,
    marginBottom: wp(40),
  },

  trendingText: {
    color: "white",
    fontSize: wp(14),
    fontWeight: "600",
    paddingHorizontal: wp(15),
    paddingVertical: wp(10),
  },
  iconsContainer: {
    paddingLeft: wp(15),
    flexWrap: "wrap",
    flexDirection: "row",
  },
  emojiButton: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    marginRight: (width - wp(275)) / 6,
    marginBottom: (width - wp(275)) / 6,
    backgroundColor: "#312446",
    justifyContent: "center",
    alignItems: "center",
  },

  itemColorView: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
  },

  spacerView: {
    height: wp(10),
  },

  fadeContainer: {
    position: "absolute",
    bottom: wp(20),
    width: "100%",
    height: wp(90),
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
  },

  expandButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  expandButton: {
    width: wp(40),
    height: wp(40),
  },
  expandIcon: {
    tintColor: "#0B0516",
  },
});
