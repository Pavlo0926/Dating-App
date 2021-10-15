import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  modalContainer: {
    borderRadius: wp(20),
  },

  titleText: {
    color: "white",
    fontSize: wp(22),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(55),
  },
  messageText: {
    color: "#ABA7D5",
    fontSize: wp(16),
    fontWeight: "600",
    textAlign: "center",
    marginTop: wp(3),
    marginHorizontal: wp(28),
    minHeight: wp(38),
  },

  buttonContainer: {
    marginHorizontal: wp(24),
    marginBottom: wp(30),
    marginTop: wp(17),
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
    width: wp(34),
    height: wp(34),
    resizeMode: "contain",
  },
});
