import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  backgroundView: {
    borderRadius: wp(20),
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  phoneContainer: {
    flexDirection: "row",
    marginHorizontal: wp(18),
    
  },
  phoneLabel: {
    fontFamily: "OpenSans",
    textAlign: "center",
    fontSize: wp(8),
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    height: wp(20),
    marginTop: wp(3),
  },
  phoneCodeContainer: {
    width: wp(70),
    height: wp(35),
  },
  phoneNumberContainer: {
    flex: 1,
    marginLeft: wp(10),
  },

  inputContainer: {
    marginHorizontal: wp(18),
    marginBottom: wp(22),
  },

  buttonContainer: {
    width: wp(60),
    marginBottom: wp(38),
    alignSelf: "center",
  },
  button: {
    height: wp(30),
  },
  buttonText: {
    color: "#0B0516",
    fontFamily: "OpenSans",
    fontSize: wp(13),
    fontWeight: "700",
  },
});
