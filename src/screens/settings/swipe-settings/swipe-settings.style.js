import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    borderRadius: wp(22),
    paddingBottom: wp(24),
    minHeight: wp(500),
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  safeAreaContainer: {
    flex: 1,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPadding: {
    padding: wp(20),
  },

  titleText: {
    flex: 1,
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(14),
    fontWeight: "400",
  },
  valueText: {
    color: "#E8E6FF",
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    textAlign: "right",
  },
  subValueText: {
    color: "#E8E6FF",
    fontFamily: "OpenSans",
    fontSize: wp(8),
    fontWeight: "400",
    textAlign: "right",
  },
  arrowRight: {
    marginLeft: wp(10),
  },

  separator: {
    height: wp(1),
    backgroundColor: "white",
    opacity: 0.15,
  },

  thumbMaker: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: "white",
  },
  sliderContainer: {
    height: wp(20),
    marginLeft: wp(25),
    marginBottom: wp(20),
  },
  tracker: {
    height: wp(4),
    borderRadius: wp(2),
  },
  selectedTracker: {
    backgroundColor: "#617FFF",
  },
  unselectedTracker: {
    backgroundColor: COLOR.TEXT_SECONDARY_4,
  },

  description: {
    color: COLOR.TEXT_SECONDARY_4,
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    paddingHorizontal: wp(20),
  },
});
