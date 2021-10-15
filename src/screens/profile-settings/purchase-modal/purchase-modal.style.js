import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  
  mainBackground: {
    width: screenWidth - wp(40),
    height: ((screenWidth - wp(40)) * 480) / 335,
    borderRadius: wp(22),
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
  },
/// 637, 680
  maskContainer: {
    position: "absolute",
    left: -wp(162),
    right: -wp(140),
    top: -wp(160),
    bottom: -wp(43),
    opacity: 0.6,
  },
  pluzoplusMask: {
    flex: 1,
  },
  pluzoplusPlus: {
    width: "100%",
    height: wp(61.91),
    resizeMode: "contain",
  },

  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -wp(30),
  },

  logoContainer: {
    alignItems: "center",
  },
  pluzoplusLogo: {
    width: wp(150),
    height: wp(49),
    resizeMode: "contain",
  },
  descText: {
    color: "white",
    fontSize: wp(12),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(13.2),
  },

  detailContainer: {
    alignItems: "center",
    marginTop: -wp(5),
  },
  includesText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    color: "white",
    marginBottom: wp(11),
  },
  flexRowDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: wp(8),
  },
  tickIcon: {
    width: wp(13.89),
    height: wp(10.97),
    resizeMode: "stretch",
  },
  detailText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: wp(4),
  },

  priceText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    color: "white",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginBottom: wp(30),
    alignSelf: "center",
  },
  buttonContainer: {
    width: screenWidth - wp(90),
    marginTop: -wp(25),
    color: "white",
  },
  plusContainer: {
    position: "absolute",
    top: -wp(2),
    bottom: -wp(2),
    left: wp(17),
    width: screenWidth - wp(124),
  },
  plusImage: {
    width: "100%",
    height: "100%",
  },
});
