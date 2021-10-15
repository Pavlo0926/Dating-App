import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  modalContainer: {
    borderRadius: wp(20),
  },

  titleText: {
    color: "white",
    fontSize: wp(22),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(35),
  },

  buttonContainer: {
    marginHorizontal: wp(24),
    marginBottom: wp(30),
    marginTop: wp(26),
  },
});
