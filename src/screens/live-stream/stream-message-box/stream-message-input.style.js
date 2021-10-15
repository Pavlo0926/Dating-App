import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: wp(10),
    alignItems: "center",
  },
  flexFill: {
    flex: 1,
  },
  bottomMargin: {
    marginBottom: wp(6),
  },
  inputContainer: {
    flex: 1,
    height: wp(36),
    borderRadius: wp(18),
    // borderWidth: wp(2),
    // borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  inputField: FontHelper.font({
    flex: 1,
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    color: COLOR.TEXT_PRIMARY,
    marginLeft: wp(15),
    marginRight: wp(15),
    padding: 0,
  }),
  sendButtonContainer: {
    width: wp(35),
    height: wp(35),
  },
  noMarginRight: {
    marginRight: wp(0),
  },
  sendButton: {
  },
  sendButtonIcon: {
    tintColor: "white",
    width: wp(15),
    height: wp(10),
  },
  sendIcon: {
    width: wp(15),
    height: wp(15),
    resizeMode: "contain",
  },
  gameIcon: {
    marginHorizontal: wp(10),
    width: wp(40),
    height: wp(20),
    resizeMode: "contain",
  },
  settingIcon: {
    width: wp(20),
    height: wp(20),
    marginRight: wp(5),
    marginLeft: wp(14),
    resizeMode: "contain",
  },

  handButton: {
    width: wp(27),
    marginLeft: wp(16),
    alignItems: "center",
  },
  handIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: "contain",
  },
});
