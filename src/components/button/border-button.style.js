import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    height: wp(35),
    borderRadius: wp(50),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: wp(2),
    borderColor: "white",
  },
  buttonText: {
    fontSize: wp(14),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
