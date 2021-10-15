import { StyleSheet, Dimensions } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  backButtonContainer: {
    width: wp(35),
    height: wp(35),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(37),
    paddingTop: (height / 100) * 18,
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: wp(16),
    color: "#ABA7D5",
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
    color: COLOR.TEXT_INPUT,
    borderRadius: wp(25),
    fontSize: wp(14),
    fontWeight: "600",
    paddingVertical: 0,
  }),
  informationContainer: {
    alignItems: "center",
    marginTop: wp(35),
  },
  instructionText: {
    textAlign: "center",
    marginTop: wp(3),
    fontSize: wp(14),
    color: "#ABA7D5",
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
    paddingHorizontal: wp(37),
    paddingBottom: wp(40),
  },
});
