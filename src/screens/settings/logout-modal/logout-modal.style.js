import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  container: {
    borderRadius: wp(22),
  },

  questionText: {
    color: "white",
    fontSize: wp(22),
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: wp(30),
    paddingBottom: wp(42),
  },

  separator: {
    height: wp(1),
    backgroundColor: "white",
    opacity: 0.15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: wp(15),
  },
  logoutText: {
    color: "#ABA7D5",
    fontFamily: "OpenSans",
    fontSize: wp(16),
    paddingLeft: wp(10),
  },
  buttonIcon: {
    width: wp(15),
    height: wp(18),
    resizeMode: "contain",
  },
  cancelText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(16),
  },
});
