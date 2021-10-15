import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  absoluteView: {
    position: "absolute",
  },

  fullView: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  minimizedView: {
    width: 130,
    height: 200,
  },

  floatingContainer: {
    flex: 1,
    overflow: "hidden",
  },
  border: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.43)",
  },

  alertContainer: {
    position: "absolute",
    left: 0,
    right: 0,
  },

  tutorialContainer: {
    position: "absolute",
    width: 130,
  },
  tutorialView: {
    flex: 1,
    height: 30,
    borderRadius: wp(25),
    marginBottom: wp(10),
    justifyContent: "center",
  },
  tutorialText: {
    color: "#0B0516",
    fontSize: wp(10),
    fontFamily: "OpenSans",
    fontWeight: "600",
    textAlign: "center",
  },
});
