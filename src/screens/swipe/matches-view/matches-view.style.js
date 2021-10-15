import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const shadowOptions = {
  width: wp(150),
  height: wp(150),
  color: "#00CBFF",
  opacity: 0.6,
  _borderRadius: wp(75),
  spread: 0,
  blur: wp(20),
  offsetX: 0,
  offsetY: 0,
};

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  userImage: {
    width: wp(150),
    height: wp(150),
    borderRadius: wp(75),
    borderWidth: wp(4),
    borderColor: "#01FF8D",
  },
  rightImageContainer: {
    left: -wp(4),
  },

  heartImage: {
    width: wp(35),
    height: wp(30),
    top: -wp(12),
  },
  matchText: {
    color: "white",
    fontSize: wp(20),
    fontWeight: "bold",
  },
});
