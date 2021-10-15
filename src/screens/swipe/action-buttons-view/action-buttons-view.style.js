import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // zIndex: 1000,
  },
  bottomContainer: {
    marginBottom: wp(50),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(25),
  },
  buttonRowMargin: {
    marginBottom: wp(30),
    marginTop: wp(20),
  },
  buttonSmall: {
    width: wp(50),
    height: wp(50),
    marginHorizontal: wp(10),
    resizeMode: "stretch",
  },
  buttonNormal: {
    width: wp(70),
    height: wp(70),
  },

  boostButtonContainer: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    borderWidth: wp(3),
    borderColor: "#D491FF",
    backgroundColor: "rgba(11, 5, 22, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(10),
  },
  boostText: {
    color: "#D491FF",
    fontSize: wp(15),
    fontWeight: "bold",
    textShadowColor: "#6E00FF",
    textShadowRadius: 15,
    textShadowOffset: {width: 0, height: 0},
  },
  boostRocketView1: {
    position: "absolute",
    top: -wp(18),
    left: wp(18),
    width: wp(24),
    height: wp(24),
  },
  boostRocketView2: {
    position: "absolute",
    top: -wp(18),
    left: -wp(0),
    width: wp(24),
    height: wp(24),
  },
});
