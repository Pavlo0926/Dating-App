import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("window").width;
export const circleWidthA = screenWidth;
export const circleWidthB = (screenWidth * 70) / 100;
export const circleWidthC = (screenWidth * 42) / 100;

export default StyleSheet.create({
  rootContainer: {
    // marginBottom: 50,
  },
  animationContainer: {
    flex: 1,
    marginBottom: wp(90),
    justifyContent: "center",
  },
  container: {
    width: screenWidth,
    height: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },

  containerA: {
    width: circleWidthA,
    height: circleWidthA,
    borderRadius: circleWidthA / 2,
    backgroundColor: "rgba(171,167,213,0.4)",
    position: "absolute",
  },
  containerB: {
    width: circleWidthB,
    height: circleWidthB,
    borderRadius: circleWidthB / 2,
    backgroundColor: "rgba(171,167,213,0.4)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  containerC: {
    width: circleWidthC,
    height: circleWidthC,
    borderRadius: circleWidthC / 2,
    backgroundColor: "rgba(171,167,213,0.4)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  userImage: {
    width: (screenWidth * wp(30)) / 100,
    height: (screenWidth * wp(30)) / 100,
    borderRadius: screenWidth / 2,
    position: "absolute",
  },

  contentContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  descriptionText: {
    marginTop: wp(30),
    marginBottom: wp(20),
    paddingHorizontal: wp(20),
    fontWeight: "600",
    fontSize: wp(14),
    textAlign: "center",
    color: COLOR.TEXT_SECONDARY_4,
  },
  buttonContainer: {
    paddingHorizontal: wp(50),
    paddingBottom: wp(70),
  },

  flexFill: {
    flex: 1,
  },
  modalContainer: {
    borderRadius: wp(22),
  },
});
