import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
  noVideosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: wp(40),
    paddingHorizontal: wp(15),
    justifyContent: "center",
  },
  absolute: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  userContainer: {
    marginTop: wp(35),
    marginHorizontal: wp(5),
  },
  imageContainer: {},
  imageUserContainer: {
    width: wp(80),
    height: wp(70),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp(60),
    height: wp(60),
    borderRadius: wp(30),
  },
  iconMicContainer: {
    width: wp(18),
    height: wp(18),
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0B0516",
    borderRadius: wp(9),
    justifyContent: "center",
    alignItems: "center",
  },
  iconMic: {
    width: wp(10),
    height: wp(10),
  },
  textContainer: {
    backgroundColor: "#312446",
    borderRadius: wp(20),
    paddingHorizontal: wp(10),
    paddingVertical: wp(5),
    marginTop: wp(10),
    width: wp(60),
    overflow: "hidden",
  },
  nameText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(10),
    textAlign: "center",
  },
  overlayView: {
    width: wp(22),
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
  },
});
