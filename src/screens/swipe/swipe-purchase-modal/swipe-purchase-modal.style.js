import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  flexFill: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  container: {},
  boxContainer: {
    borderRadius: wp(22),
    overflow: "hidden",
  },
  boxContentContainer: {
    borderWidth: wp(2),
    borderTopLeftRadius: wp(22),
    borderTopRightRadius: wp(22),
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
    paddingBottom: wp(30),
    borderColor: "rgba(255, 255, 255, 0.15)",
  },

  uptoLogo: {
    position: "absolute",
    left: -wp(15),
    top: -wp(15),
  },
  logoContainer: {
    marginTop: wp(29),
    marginBottom: wp(7),
  },
  mainLogo: {
    marginTop: wp(12),
    alignSelf: "center",
  },
  mainLogoCenter: {
    alignSelf: "center",
    position: "absolute",
  },

  titleText: {
    color: "white",
    fontSize: wp(24),
    fontWeight: "bold",
    alignSelf: "center",
  },
  subText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    color: "white",
    alignSelf: "center",
  },

  pricesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(263),
    marginTop: wp(30),
    marginBottom: wp(35),
    alignSelf: "center",
  },

  buttonContainer: {
    marginHorizontal: wp(25),
  },
  plusMark: {
    position: "absolute",
    top: -wp(2),
    bottom: -wp(2),
    left: wp(17),
    width: width - wp(124),
  },
  plusImage: {
    width: "100%",
    height: "100%",
  },
  orText: {
    fontFamily: "OpenSans",
    fontWeight: "700",
    fontSize: wp(10),
    color: "white",
    marginVertical: wp(8),
    alignSelf: "center",
  },

  noThanksButton: {
    alignSelf: "center",
  },
  noThanksText: {
    paddingVertical: wp(15),
    color: "white",
    fontSize: wp(10),
    fontFamily: "OpenSans",
    textDecorationLine: "underline",
  },
});
