import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {},
  volumeContainer: {
    position: "absolute",
    backgroundColor: "rgba(192, 192, 192, 0.8)",
    left: wp(10),
    right: wp(10),
    top: wp(5),
    bottom: wp(5),
    borderRadius: wp(30),
  },
  volumeContainer1: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    left: wp(1),
    right: wp(1),
    top: wp(1),
    bottom: wp(1),
    borderRadius: wp(30),
  },

  expandContainer: {
    position: "absolute",
    right: wp(35),
    height: wp(50),
    width: wp(167),
    overflow: "hidden",
  },
  expandContentContainer: {
    flexDirection: "row",
  },
  muteButton: {
    position: "absolute",
    right: 0,
    width: wp(167),
    height: wp(50),
    borderRadius: wp(25),
    backgroundColor: "#ABA7D5",
    justifyContent: "center",
  },
  kickButton: {
    position: "absolute",
    right: 0,
    width: wp(120),
    height: wp(50),
    borderRadius: wp(25),
    backgroundColor: "#312446",
    justifyContent: "center",
  },
  banButton: {
    position: "absolute",
    right: 0,
    width: wp(70),
    height: wp(50),
    borderTopLeftRadius: wp(25),
    borderBottomLeftRadius: wp(25),
    backgroundColor: "#FF0036",
    justifyContent: "center",
  },
  expandButtonText: {
    color: "white",
    fontSize: wp(10),
    fontWeight: "600",
    marginLeft: wp(15),
  },
  expandButtonTextLong: {
    marginLeft: wp(3),
  },
  expandButtonTextBlack: {
    color: "#0B0516",
    fontSize: wp(10),
    fontWeight: "600",
    marginLeft: wp(15),
  },
});
