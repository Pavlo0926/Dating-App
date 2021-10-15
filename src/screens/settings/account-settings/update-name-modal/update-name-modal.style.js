import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  container: {
    borderRadius: wp(20),
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
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
