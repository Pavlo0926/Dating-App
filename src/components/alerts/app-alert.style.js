import { Dimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  modalContainer: {
  },

  container: {
    borderRadius: wp(22),
    paddingHorizontal: wp(58),
    paddingTop: wp(26),
    alignItems: "center",
  },

  titleText: {
    fontSize: wp(22),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  contentText: {
    fontSize: wp(16),
    fontWeight: "600",
    color: "#ABA7D5",
    textAlign: "center",
    marginTop: wp(5),
  },
  buttonContainer: {
    marginVertical: wp(30),
  },
  buttonStyle: {
    width: wp(63),
    height: wp(28),
  },
  buttonText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "700",
    color: "#0B0516",
  },
});
