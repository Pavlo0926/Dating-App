import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  backButtonContainer: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingTop: (height / 100) * 18,
    paddingHorizontal: 37,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 40,
  },
  successIconContainer: {
    alignItems: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeInputStyle: {
    backgroundColor: "white",
    height: 42,
    color: "#9892A3",
    borderRadius: 25,
  },
  informationContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  instructionText: {
    textAlign: "center",
    marginTop: 3,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendButtonContainer: {
    width: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    marginBottom: 40,
    paddingHorizontal: 37,
  },
});
