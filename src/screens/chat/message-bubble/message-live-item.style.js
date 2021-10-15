import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  endContainer: {
    flexDirection: "column-reverse",
    width: (SCREEN_WIDTH - wp(30)) / 2,
    backgroundColor: "#ABA7D5",
    borderRadius: wp(22),
    alignItems: "center",
    overflow: "hidden",
  },
  endText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    color: "#0B0516",
    marginTop: wp(6),
    marginBottom: wp(11),
  },
  endContentPadding: {
    paddingHorizontal: wp(20),
    paddingVertical: wp(10),
  },

  liveContainer: {
    flexDirection: "column-reverse",
    width: (SCREEN_WIDTH - wp(30)) / 2,
    borderRadius: wp(22),
    alignItems: "center",
    overflow: "hidden",
  },
  liveJoinText: {
    fontSize: wp(16),
    fontWeight: "bold",
    color: "white",
    marginTop: wp(6),
    marginBottom: wp(11),
  },
  liveContentContainer: {
    width: "100%",
    backgroundColor: "#312446",
    borderRadius: wp(22),
  },
  liveNameText: {
    fontSize: wp(14),
    fontWeight: "bold",
    color: "white",
  },
  liveCreatorText: {
    fontFamily: "OpenSans",
    fontSize: wp(11),
    color: "white",
  },

});
