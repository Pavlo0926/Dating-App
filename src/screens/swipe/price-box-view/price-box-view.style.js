import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    paddingBottom: wp(35),
  },
  boxContainer: {
    width: wp(75),
    height: wp(102),
    borderRadius: wp(22),
    overflow: "hidden",
  },
  boxContentContainer: {
    width: "100%",
    height: "100%",
    borderRadius: wp(22),
    borderWidth: wp(2),
    borderColor: "rgba(255, 255, 255, 0)",
    alignItems: "center",
  },
  countText: {
    fontFamily: "OpenSans",
    fontSize: wp(36),
    fontWeight: "700",
  },
  boxTitle: {
    fontSize: wp(14),
    fontWeight: "bold",
    textAlign: "center",
    top: -wp(6),
  },
  saveTextContainer: {
    width: wp(75),
    paddingTop: wp(3),
    paddingBottom: wp(5),
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    bottom: -wp(2),
  },
  saveText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },

  priceText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    textAlign: "center",
    color: "white",
    marginBottom: wp(10),
  },
  selectContainer: {
    position: "absolute",
    bottom: 0,
    width: wp(75),
    height: wp(87),
    justifyContent: "flex-end",
    borderRadius: wp(22),
    backgroundColor: "#0000",
  },
  selected: {
    backgroundColor: "#1A023E",
  },
  selectedBorder: {
    borderColor: "rgba(255, 255, 255, 0.23)",
  },
  selectedColor: {
    color: "#0B0516",
  },
  unselectedColor: {
    color: "#E8E6FF",
  },
});
