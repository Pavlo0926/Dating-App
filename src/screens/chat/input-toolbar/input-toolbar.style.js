import { StyleSheet, Platform } from "react-native";
import { widthPercentageToDP as wp, FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.MESSAGE_INPUT_TOOLBAR_BACKGROUND,
    borderTopWidth: wp(1),
    borderTopColor: "#FFFFFF10",
    paddingBottom: wp(12),
  },
  composerContainer: {
    flexDirection: "row",
    flex: 1,
    marginLeft: wp(20),
    marginRight: wp(10),
  },
  composerShadow: {
    marginLeft: 0,
    marginTop: wp(10),
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    marginTop: wp(10),
    backgroundColor: "white",
    borderRadius: wp(25),
    alignItems: "center",
  },
  inputField: FontHelper.font({
    fontFamily: "OpenSans",
    fontSize: 16,
    color: COLOR.TEXT_INPUT,
    marginLeft: wp(15),
    marginRight: wp(45),
    ...Platform.select({
      ios: {
        marginTop: wp(3),
        marginBottom: wp(2),
        lineHeight: 20,
      },
      android: {
        marginBottom: wp(0),
        lineHeight: wp(18),
      },
    }),
  }),
  sendButtonContainer: {
    width: wp(25),
    height: wp(25),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: wp(18),
    top: Platform.OS === "ios" ? wp(15) : wp(17),
  },
  sendButton: {
    width: wp(25),
    height: wp(25),
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonIcon: {
    width: wp(16),
    height: wp(10),
    tintColor: "white",
  },
  cameraButton: {
    height: wp(30),
    justifyContent: "center",
    position: "absolute",
    right: wp(23),
    ...Platform.select({
      ios: {
        top: wp(12),
      },
      android: {
        top: wp(14),
      },
    }),
  },
  cameraButtonIcon: {
    width: wp(20),
    height: wp(16),
    resizeMode: "stretch",
  },
});
