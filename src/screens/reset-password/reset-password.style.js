import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
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
    justifyContent: "center",
    paddingHorizontal: wp(37),
    marginTop: -wp(30),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(64),
  },
  inputFieldSeparator: {
    height: wp(20),
  },
  informationContainer: {
    alignItems: "center",
    marginTop: wp(25),
  },
  passwordRequirementTitle: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: "rgba(255, 255, 255, 0.5)",
    textDecorationLine: "underline",
  },
  passwordRequirement: {
    marginTop: wp(3),
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: "rgba(255, 255, 255, 0.5)",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructionValidIcon: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(4),
    backgroundColor: "#00FF6F",
    marginTop: wp(3),
    marginRight: wp(5),
  },
  footer: {
    marginTop: wp(40),
    paddingHorizontal: wp(37),
    paddingBottom: wp(20),
  },
});
