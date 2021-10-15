import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  loadingIndicator: {
    alignSelf: "center",
    marginTop: wp(200),
  },
  systemMessage: {
    marginBottom: wp(15),
  },

  firstMessagesContainer: {

  },
  firstMessagesContentContainer: {
    paddingHorizontal: wp(20),
    paddingVertical: wp(9),
  },
  firstMessage: {
    borderRadius: wp(20),
    backgroundColor: "#617FFF",
    paddingHorizontal: wp(16),
    paddingVertical: wp(9),
    marginRight: wp(10),
  },
  firstMessageText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(12),
  },

  notifyContainer: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  notifySubContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: wp(22),
    paddingVertical: wp(10),
    alignItems: "center",
  },
  notifyIcon: {
    width: wp(19.98),
    height: wp(21.95),
    resizeMode: "contain",
    marginRight: wp(20),
  },
  notifyTitle: {
    fontSize: wp(14),
    fontWeight: "bold",
    color: "#0B0516",
  },
  notifySubText: {
    fontSize: wp(10),
    fontWeight: "600",
    color: "#312446",
  },
});
