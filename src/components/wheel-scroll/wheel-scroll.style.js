import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
  },

  topGradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    opacity: 0.1,
  },

  bottomGradientBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    opacity: 0.1,
  },

  highlightView: {
    position: "absolute",
    borderRadius: wp(35),
    height: wp(35),
  },

  selectedItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  scrollViewContainer: {
    flex: 1,
    width: "100%",
    marginVertical: wp(20),
  },
  scrollContainer: {
    width: "100%",
    flex: 1,
  },

  flexFill: {
    flex: 1,
  },
});
