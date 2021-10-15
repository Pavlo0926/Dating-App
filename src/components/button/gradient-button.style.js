import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    height: wp(35),
    borderRadius: wp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.25,
  },
  buttonText: {
    fontSize: wp(16),
    fontWeight: "bold",
    color: "white",
  },
  buttonTextDisabled: {
    color: "rgba(200, 200, 200, 1)",
  },
});
