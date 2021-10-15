import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },

  contentContainer: {
    paddingVertical: wp(28),
    paddingHorizontal: wp(21),
  },

  contentText: {
    color: "white",
    fontSize: wp(14),
    fontFamily: "OpenSans",
    textAlign: "justify",
  },
  boldText: {
    color: "white",
    fontSize: wp(14),
    fontFamily: "OpenSans",
    fontWeight: "700",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: wp(14),
    fontFamily: "OpenSans",
  },
  paddingLeft: {
    paddingLeft: wp(0),
  },
  listMark: {
    width: wp(22),
  },

  // table
  flexTableRow: {
    flexDirection: "row",
    borderColor: "white",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  tableRowOne: {
    flex: 1.5,
    borderColor: "white",
    borderRightWidth: 1,
  },
  tableRowTwo: {
    flex: 2,
    borderColor: "white",
    borderRightWidth: 1,
  },
  tableRowThree: {
    flex: 2,
  },
  tableTop: {
    marginTop: wp(10),
  },
  tableBottom: {
    height: 1,
    backgroundColor: "white",
  },
  tableNameText: {
    fontFamily: "OpenSans",
    fontSize: wp(14),
    fontWeight: "700",
    color: "white",
    paddingHorizontal: wp(5),
  },
  tableContentText: {
    fontFamily: "OpenSans",
    fontSize: wp(14),
    color: "white",
    paddingHorizontal: wp(5),
    borderColor: "white",
    borderBottomWidth: 1,
  },
});
