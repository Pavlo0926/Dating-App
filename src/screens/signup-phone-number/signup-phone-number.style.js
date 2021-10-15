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
    flexDirection: "column-reverse",
    paddingHorizontal: wp(37),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(25),
  },
  phoneContainer: {
    flexDirection: "row",
  },
  phoneLabel: {
    fontFamily: "OpenSans",
    textAlign: "center",
    fontSize: wp(8),
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    height: wp(20),
  },
  phoneCodeContainer: {
    width: wp(70),
  },
  phoneNumberContainer: {
    paddingTop: wp(20),
    flex: 3,
  },
  phoneSeparator: {
    width: wp(15),
  },
  informationContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: wp(25),
  },
  passwordRequirementTitle: {
    fontSize: wp(14),
    color: "#ABA7D5",
    textDecorationLine: "underline",
  },
  instructionText: {
    fontFamily: "OpenSans",
    textAlign: "center",
    marginTop: wp(3),
    fontSize: wp(12),
    fontWeight: "400",
    color: "#ABA7D5",
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
    paddingHorizontal: wp(37),
    marginBottom: wp(40),
  },
});
