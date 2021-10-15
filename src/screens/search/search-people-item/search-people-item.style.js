import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  messageContainer: {
    height: wp(65),
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
  },
  messageContentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  subject: {
    fontSize: wp(14),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
  },
  preview: {
    fontSize: wp(12),
    fontWeight: "700",
    color: COLOR.MESSAGE_PREVIEW,
  },
  timeContainer: {
    marginHorizontal: wp(10),
    alignItems: "center",
    flexDirection: "row",
  },
  addButton: {
    height: wp(25),
    width: wp(60),
  },
  addButtonText: {
    fontFamily: "OpenSans",
    fontWeight: "700",
    fontSize: wp(12),
    color: "black",
  },
  removeFriendButton: {
    width: wp(25),
    height: wp(25),
    marginRight: wp(13),
  }
});
