import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  emojiContainer: {
    position: "absolute",
    left: wp(10),
    right: wp(10),
    top: wp(60),
  },

  liveButtonContainer: {
    marginBottom: wp(40),
    paddingHorizontal: wp(37),
  },
});
