import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  verticalCenter: {
    justifyContent: "center",
  },
  backButtonContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: wp(37),
    justifyContent: "center",
  },
  contentPadding: {
    paddingTop: (height / 100) * 18,
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(45),
  },
  inputFieldSeparator: {
    height: wp(20),
  },
  takenPosition: {
    position: "absolute",
    right: wp(8),
    // top: wp(9.5),
  },
  takenIcon: {
    width: wp(15),
    height: wp(15),
    resizeMode: "contain",
  },
  checkIcon: {
    tintColor: "#00FF77",
  },
  crossIcon: {
    tintColor: "#FF0036",
  },
  takenUsername: {
    marginTop: wp(7),
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "600",
    color: "#FF0036",
    textAlign: "center",
  },
  availableScroll: {
    minHeight: wp(70),
    maxHeight: wp(70),
    marginHorizontal: -wp(17),
  },
  availableContainer: {
    flexDirection: "row",
  },
  availableButton: {
    height: wp(35),
    marginTop: wp(16),
    paddingHorizontal: wp(17),
    backgroundColor: "#312446",
    borderRadius: wp(25),
    justifyContent: "center",
  },
  avaliableText: {
    fontSize: wp(14),
    fontWeight: "bold",
    color: "white",
  },
  availableSeparator: {
    width: wp(10),
  },
  visiblePass: {
    tintColor: "#0B0516",
  },
  invisiblePass: {
    tintColor: "#ABA7D5",
  },
  informationContainer: {
    alignItems: "center",
    marginTop: wp(25),
  },
  passwordRequirementTitle: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: "#ABA7D5",
    textDecorationLine: "underline",
  },
  passwordRequirement: {
    marginTop: wp(3),
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: "#ABA7D5",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructionInvalidIcon: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(4),
    borderWidth: wp(1),
    borderColor: "#ABA7D5",
    marginTop: wp(3),
    marginRight: wp(5),
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
    marginBottom: wp(40),
  },
});
