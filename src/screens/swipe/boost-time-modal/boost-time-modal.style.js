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
    marginTop: wp(50),
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
  remainTime: {
    color: "#D491FF",
    fontSize: wp(22),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(44),
  },

  buttonContainer: {
    height: wp(35),
    marginHorizontal: wp(24),
    marginTop: wp(12.5),
  },
  closeButton: {
    height: wp(35),
    marginHorizontal: wp(24),
    marginTop: wp(10),
    marginBottom: wp(20),
  },

  logoContainer: {
    position: "absolute",
    top: -wp(35),
    alignSelf: "center",
  },
  logoIcon: {
    width: wp(90),
    height: wp(90),
    resizeMode: "contain",
  },
});
