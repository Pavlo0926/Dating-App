import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    height: wp(35),
    borderRadius: wp(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: wp(16),
    color: "#150A26",
    fontWeight: "bold",
    textAlign: "center",
  },
});
