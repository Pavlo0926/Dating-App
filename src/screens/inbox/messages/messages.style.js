import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    height: wp(100),
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(20),
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
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  subject: {
    fontSize: wp(14),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
    marginRight: wp(8),
  },
  badgeImage: {
    width: wp(14),
    height: wp(14),
    marginRight: wp(3),
  },
  preview: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    color: COLOR.MESSAGE_PREVIEW,
    marginTop: wp(2),
  },
  previewNew: {
    fontWeight: "700",
  },
  timeContainer: {
    flexDirection: "row",
    paddingLeft: wp(5),
    paddingRight: wp(10),
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

  flexFill: {
    flex: 1,
  },
  hiddenContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: -wp(150),
    width: wp(150),
  },
  hiddenContainer1: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: -wp(75),
    width: wp(75),
  },
  hiddenReportContainer: {
    backgroundColor: "#ABA7D5",
  },
  hiddenRemoveContainer: {
    backgroundColor: "#FF0036",
  },
  hiddenButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenIcon: {
    width: wp(14),
    height: wp(14),
    tintColor: "#0B0516",
    resizeMode: "contain",
  },
  hiddenText: {
    color: "#0B0516",
    fontWeight: "bold",
    fontSize: wp(10),
    marginTop: wp(5),
  },

  rowBack: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: wp(150),
  },
  rowBack1: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: wp(75),
  },
  backReportContainer: {
    flex: 1,
  },
  backRemoveContainer: {
    flex: 1,
  }
});
