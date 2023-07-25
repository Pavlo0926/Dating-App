import { StyleSheet } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

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
    paddingTop: wp(120),
    paddingHorizontal: wp(37),
    marginTop: -wp(20),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: wp(16),
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600",
    textAlign: "center",
    marginTop: wp(5),
    marginBottom: wp(40),
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeInputStyle: FontHelper.font({
    backgroundColor: "white",
    width: wp(58),
    height: wp(35),
    borderRadius: wp(25),
    color: COLOR.TEXT_INPUT,
    fontSize: wp(14),
    fontWeight: "600",
    paddingVertical: 0,
  }),
  informationContainer: {
    alignItems: "center",
    marginTop: wp(25),
  },
  instructionText: {
    textAlign: "center",
    marginTop: wp(3),
    fontSize: wp(14),
    color: "rgba(255, 255, 255, 0.6)",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendButtonContainer: {
    width: wp(200),
    marginTop: wp(10),
    marginBottom: wp(10),
  },
  footer: {
    marginTop: wp(40),
    paddingHorizontal: wp(37),
    paddingBottom: wp(40),
  },
});
