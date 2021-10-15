import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(20),
    marginTop: wp(25),
  },
  titleText: {
    color: "white",
    fontSize: wp(22),
    fontWeight: "bold",
  },

  buttonContainer: {
    height: wp(35),
    marginTop: wp(20),
    backgroundColor: "#E8E6FF",
    borderRadius: wp(18),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: wp(12),
    fontWeight: "600",
  },
});
