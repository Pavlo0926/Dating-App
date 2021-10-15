import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    paddingVertical: wp(5),
  },
  contentContainer: {
    flexDirection: "row",
    height: wp(10),
    backgroundColor: "rgba(11, 5, 25, 0.2)",
    alignItems: "center",
    paddingLeft: wp(4),
  },

  gradientFill: {
    flexDirection: "row",
    height: wp(2),
  },
  flexFill: {
    flex: 1,
  },
  remainingFill: {
    flex: 1,
    backgroundColor: "white",
    height: wp(2),
  },
  separator: {
    width: wp(4),
  },
});
