import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContentContainer: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: wp(37),
    marginTop: -wp(30),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(18),
  },
  inputFieldSeparator: {
    marginBottom: wp(20),
  },
  buttonContainer: {
    marginTop: wp(25),
  },
  orText: {
    fontSize: wp(14),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: wp(10),
  },
  forgotPasswordContainer: {
    marginTop: wp(25),
    alignItems: "center",
  },
  forgotPasswordText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: "white",
    textDecorationLine: "underline",
  },
});
