import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  opacityFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0B0516",
    opacity: 0.3,
  },
  opacityBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: wp(200),
  },

  // Stream Users
  broadcasterContainer: {
    position: "absolute",
    bottom: wp(110),
    width: wp(202),
    alignSelf: "flex-end",
  },
  broadcasterList: {
    flex: 1,
  },
  streamUserContainer: {
    width: wp(70),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  streamUser: {
    // marginBottom: wp(10),
  },

  // Messages
  messageBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },

  // all users
  usersContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
