import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    margin: 0,
  },
  darkView: {
    backgroundColor: "#000",
    opacity: 1,
  },
  image: {
    flex: 1,
  },

  loadingIndicator: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
  },

  closeButton: {
    position: "absolute",
    top: wp(10),
    right: wp(20),
  },
  closeImage: {
    tintColor: "white",
  },
});
