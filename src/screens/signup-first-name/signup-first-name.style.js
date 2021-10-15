import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(37),
  },
  titleFieldContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(68),
  },
  inputFieldSeparator: {
    marginBottom: wp(24),
  },
  buttonContainer: {
    marginBottom: wp(40),
  },
});
