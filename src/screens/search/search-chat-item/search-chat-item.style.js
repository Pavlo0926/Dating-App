import { StyleSheet } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  messageContainer: {
    height: wp(100),
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

  preview: FontHelper.font({
    fontSize: wp(12),
    fontWeight: "600",
    color: COLOR.MESSAGE_PREVIEW,
    marginTop: wp(2),
  }),
  previewBold: FontHelper.font({
    fontSize: wp(12),
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
    marginTop: wp(2),
  }),
  timeContainer: {
    flexDirection: "row",
    marginHorizontal: wp(10),
  },
  time: {
    marginTop: wp(35),
    fontSize: wp(10),
    color: COLOR.TEXT_SECONDARY,
  },
  unread: {
    marginLeft: wp(5),
    marginTop: wp(38),
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: COLOR.MESSAGE_UNREAD_ICON,
  },
  separator: {
    height: wp(1),
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});
