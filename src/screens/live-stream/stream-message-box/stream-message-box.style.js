import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },

  opacityBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: wp(100),
  },

  defaultButtonsContainer: {
    padding: wp(10),
  },
  defaultButton: {
    backgroundColor: COLOR.LIVE_MSG_BACKGROUND,
    height: wp(36),
    borderRadius: wp(18),
    paddingHorizontal: wp(15),
    justifyContent: "center",
    marginRight: wp(5),
  },
  defaultButtonText: {
    fontFamily: "OpenSans",
    color: "white",
    fontSize: wp(12),
    fontWeight: "400",
  },

  messageList: {
    flex: 1,
    marginHorizontal: wp(10),
  },
  messageItemContainer: {
    flexDirection: "row",
    marginBottom: wp(10),
  },
  messageAvatarContainer: {
    position: "absolute",
  },
  messageAvatar: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
  },
  messageTextContainer: {
    minHeight: wp(40),
    marginLeft: wp(10),
    paddingLeft: wp(35),
    paddingRight: wp(20),
    justifyContent: "center",
    backgroundColor: COLOR.LIVE_MSG_BACKGROUND,
    borderRadius: wp(20),
  },
  messageUser: {
    color: "white",
    fontSize: wp(10),
    fontWeight: "bold",
  },
  messageText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
  },
  messageSystemTextContainer: {
    paddingVertical: 10,
    paddingLeft: wp(16),
    paddingRight: wp(20),
    justifyContent: "center",
    backgroundColor: COLOR.LIVE_MSG_BACKGROUND,
    borderRadius: wp(20),
  },
  messageSystemText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
  },
});
