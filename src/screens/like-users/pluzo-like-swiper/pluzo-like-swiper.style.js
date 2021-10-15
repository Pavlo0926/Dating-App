import { StyleSheet, Dimensions } from "react-native";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  zIndexZero: {
    zIndex: 0,
  },
  zIndexHigh: {
    zIndex: 9999,
  },

  overlayContainer: {
    position: "absolute",
  },
});
