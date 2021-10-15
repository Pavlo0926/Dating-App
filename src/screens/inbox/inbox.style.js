import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    marginBottom: wp(50),
  },
  header: {
    flexDirection: "row",
    height: wp(70),
    paddingLeft: wp(10),
    alignItems: "center",
  },
  searchFieldContainer: {
    flex: 1,
    flexDirection: "row",
    height: wp(35),
    borderRadius: wp(25),
    borderWidth: wp(2),
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    alignItems: "center",
    alignSelf: "center",
  },
  searchIconContainer: {
    width: wp(30),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: wp(5),
    paddingTop: wp(1),
  },
  searchIcon: {
    width: wp(10.73),
    height: wp(10.73),
    resizeMode: "stretch",
  },
  searchText: {
    flex: 1,
    fontSize: wp(12),
    padding: 0,
    fontWeight: "600",
    color: COLOR.SEARCH_INPUT_TEXT,
  },
  newChatIconContainer: {
    width: wp(50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(2),
  },
  plusIcon: {
    width: wp(47),
    height: wp(47),
    resizeMode: "stretch",
  },
  pendingCountBadge: {
    position: "absolute",
    top: wp(5),
    right: wp(3),
    minWidth: wp(19),
    maxWidth: wp(25),
    height: wp(14),
    borderRadius: wp(7),
    paddingHorizontal: wp(5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00FF77",
  },
  pendingCountText: {
    fontSize: wp(9),
    fontWeight: "600",
    color: "#0B0516",
  },

  contentContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginTop: wp(20),
  },
  marginTopZero: {
    marginTop: 0,
  },
});
