import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(37),
    justifyContent: "space-between",
    paddingVertical: wp(20),
  },
  logoContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    top: -wp(40),
  },
  bottomContentContainer: {},
  buttonContainer: {
    marginTop: wp(20),
  },
  termPolicyContainer: {
    marginTop: wp(40),
    alignItems: "center",
  },
  termPolicyRowContainer: {
    flexDirection: "row",
    marginTop: wp(2),
  },
  termPolicyText: {
    fontFamily: "OpenSans",
    fontSize: wp(11),
    color: COLOR.TEXT_SECONDARY_4,
  },
  underline: {
    fontFamily: "OpenSans",
    fontSize: wp(11),
    color: COLOR.TEXT_SECONDARY_4,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
