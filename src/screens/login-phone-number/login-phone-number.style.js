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
    flexDirection: "column-reverse",
    paddingHorizontal: wp(37),
    justifyContent: "center",
    marginTop: -wp(30),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(55),
  },
  phoneContainer: {
    flexDirection: "row",
  },
  phoneLabel: {
    fontFamily: "OpenSans",
    fontWeight: "700",
    textAlign: "center",
    fontSize: wp(8),
    color: "rgba(255, 255, 255, 0.5)",
    height: wp(15),
  },
  phoneCodeContainer: {
    width: wp(70),
  },
  phoneNumberContainer: {
    paddingTop: wp(15),
    flex: 3,
  },
  phoneSeparator: {
    width: wp(15),
  },
  informationContainer: {
    alignItems: "center",
    marginTop: wp(25),
  },
  passwordRequirementTitle: {
    fontSize: wp(14),
    color: "rgba(255, 255, 255, 0.5)",
    textDecorationLine: "underline",
  },
  instructionText: {
    fontFamily: "OpenSans",
    textAlign: "center",
    marginTop: wp(3),
    fontSize: wp(14),
    fontWeight: "400",
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
    marginBottom: wp(40),
    paddingHorizontal: wp(37),
  },
});
