import { StyleSheet, Dimensions, Platform } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: parseInt((width - wp(34)) / 2, 10),
    height: parseInt((((width - wp(34)) / 2) * wp(240)) / wp(170), 10),
    ...Platform.select({
      android: {
        overflow: "hidden",
      },
      ios: {
        borderRadius: wp(22),
        overflow: "hidden",
      }
    }),
    marginHorizontal: wp(7),
  },

  userImage: {
    width: "100%",
    height: "100%",
  },

  badgesContainer: {
    position: "absolute",
    top: wp(15),
    left: wp(15),
    right: wp(15),
    flexDirection: "row",
  },
  badgeIcon: {
    width: wp(18),
    height: wp(18),
    marginRight: wp(2),
  },

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: wp(14),
  },
  gradientBack: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    opacity: 0.9,
  },
  nameText: {
    color: "white",
    fontSize: wp(16),
    fontWeight: "600",
  },
  recentlyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentlyMark: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: "#00FF77",
  },
  recentlyText: {
    color: "#00FF77",
    fontSize: wp(10),
    fontWeight: "600",
    marginLeft: wp(2.5),
  },

  blurContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  blurView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "white",
    opacity: 0.9,
  },
  blurWhiteView: {
    position: "absolute",
    left: Platform.OS === "ios" ? wp(15) : wp(14),
    right: wp(35),
    bottom: wp(30),
    height: Platform.OS === "ios" ? wp(12) : wp(13),
    borderRadius: wp(8),
    backgroundColor: "white",
  },
  blurGreenView: {
    position: "absolute",
    left: wp(15),
    right: wp(65),
    bottom: wp(18),
    height: Platform.OS === "ios" ? wp(6) : wp(8),
    borderRadius: wp(4),
    backgroundColor: "#00FF77",
  },
});
