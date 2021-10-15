import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modalMargin: {
    margin: 0,
  },
  flexFill: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "#0000",
  },
  gestureContainer: {
    // flex: 1,
    marginTop: wp(15),
    marginHorizontal: wp(15),
  },
  touchArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    borderRadius: wp(22),
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  profileImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlayView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0B0516",
    opacity: 0.6,
  },
  detailContainer: {
    paddingHorizontal: wp(15),
    paddingTop: wp(2),
    paddingBottom: wp(8),
    minHeight: wp(150),
  },
  detailOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  controlContainer: {
    flexDirection: "row",
    marginVertical: wp(18),
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonContainer: {
    width: wp(50),
    height: wp(50),
    marginHorizontal: wp(9),
  },
});
