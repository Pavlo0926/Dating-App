import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  backButton: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: "#000000",
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(10),
  },
});
