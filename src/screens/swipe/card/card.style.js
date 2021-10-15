import { Dimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  card: {
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  cardImage: {
    width: "100%",
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  overlayView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0B0516",
    opacity: 0.8,
  },

  topActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingBottom: wp(50),
  },
  gradientOpacityBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },

  tutorialContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tutorialMarkContainer: {
    position: "absolute",
    alignItems: "center",
  },
  tutorialMarkIcon: {
    width: wp(120),
    height: wp(120),
    borderRadius: wp(60),
    backgroundColor: "#0B0516",
  },
  tutorialMarkHeart: {
    marginTop: wp(20),
    paddingVertical: wp(9),
    paddingHorizontal: wp(25),
    backgroundColor: "#00FF77",
    borderRadius: wp(25),
  },
  heartText: {
    color: "#0B0516",
    fontSize: wp(14),
    fontWeight: "bold",
  },
  tutorialMarkCross: {
    marginTop: wp(20),
    paddingVertical: wp(9),
    paddingHorizontal: wp(25),
    backgroundColor: "#FF0036",
    borderRadius: wp(25),
  },
  crossText: {
    color: "#0B0516",
    fontSize: wp(14),
    fontWeight: "bold",
  },
});
