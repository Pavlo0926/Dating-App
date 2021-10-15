import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  container: {
    maxWidth: (screenWidth - wp(30)) / 2,
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
    overflow: "hidden",
  },
  imageOne: {
    resizeMode: "cover",
    width: (screenWidth - wp(30)) / 2,
    height: (screenWidth - wp(30)) / 2,
  },

  imageTwo: {
    resizeMode: "cover",
    width: (screenWidth - wp(30)) / 2,
    height: (screenWidth - wp(30)) / 4,
  },

  imageFour: {
    resizeMode: "cover",
    width: (screenWidth - wp(30)) / 4,
    height: (screenWidth - wp(30)) / 4,
  },
});
