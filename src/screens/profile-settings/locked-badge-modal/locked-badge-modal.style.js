import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    borderRadius: wp(20),
    backgroundColor: "#0B0516",
    overflow: "hidden",
  },
  backgroundCircle: {
    width: wp(345),
    height: wp(237),
    position: "absolute",
    bottom: 0,
  },

  titleText: {
    color: "white",
    fontSize: wp(22),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(60),
  },
  
  badgesContainer: {
    flexDirection: "row",
    marginTop: wp(8),
    marginBottom: wp(50),
    justifyContent: "center",
  },
  badgeIcon: {
    width: wp(15),
    height: wp(15),
    marginHorizontal: wp(8.5),
  },

  messageText: {
    color: "white",
    fontSize: wp(12),
    fontWeight: "500",
    textAlign: "center",
  },

  buttonContainer: {
    marginHorizontal: wp(35),
    marginTop: wp(10),
    marginBottom: wp(20),
    color: "white",
  },
  plusContainer: {
    position: "absolute",
    top: -wp(2),
    bottom: -wp(2),
    alignSelf: "center",
    width: screenWidth - wp(145),
  },
  plusImage: {
    width: "100%",
    height: "100%",
  },

  logoContainer: {
    position: "absolute",
    top: -wp(20),
    alignSelf: "center",
  },
  logoIconContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#211533",
    borderRadius: wp(30),
  },
  logoIcon: {
    width: wp(28),
    height: wp(28),
    resizeMode: "contain",
  },
});
