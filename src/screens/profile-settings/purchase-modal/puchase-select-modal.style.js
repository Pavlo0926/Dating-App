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
    height: ((screenWidth - wp(40)) * 375) / 335,
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
    bottom: -wp(148),
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
    marginBottom: wp(27),
  },

  detailContainer: {
    flexDirection: "row",
  },

  itemContainer: {
    marginHorizontal: wp(7),
  },
  itemContentContainer: {
    width: wp(95),
    height: wp(140),
    borderRadius: wp(15),
    alignItems: "center",
    paddingTop: wp(15),
    paddingBottom: wp(20),
    marginBottom: wp(10),
  },
  itemActive: {
    borderColor: "#FF7131",
    borderWidth: 2,
    borderRadius: wp(15),
  },
  itemPeriodText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp(12),
  },
  itemPopularText: {
    color: "#ABA7D5",
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: wp(7),
    flex: 1,
  },
  itemSaveText: {
    fontSize: wp(10),
    fontWeight: "900",
    color: "#00FF77",
    marginBottom: wp(2),
  },
  itemPriceText: {
    color: "#E5DB59",
    fontWeight: "bold",
    fontSize: wp(20),
  },
  itemUnitText: {
    color: "#ABA7D5",
    fontWeight: "600",
    fontSize: wp(8),
  },
  itemUnitText: {
    color: "#ABA7D5",
    fontWeight: "600",
    fontSize: wp(8),
  },
  selectButton: {
    height: wp(25),
  },
  selectButtonText: {
    fontSize: wp(12),
    fontWeight: "600",
  },
  itemActiveText: {
    color: "#0B0516",
  },
});
