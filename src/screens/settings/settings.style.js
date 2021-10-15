import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  safeAreaContainer: {
    flex: 1,
  },

  headerContainer: {
    height: wp(55),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(20),
  },
  backButton: {
    width: wp(30),
    height: wp(50),
    justifyContent: "center",
  },
  backButtonIcon: {
    width: wp(12),
    height: wp(18),
    resizeMode: "contain",
  },

  settingText: {
    fontSize: wp(22),
    fontWeight: "bold",
    color: "white",
    marginHorizontal: wp(20),
    marginBottom: wp(10),
  },

  itemContainer: {
    paddingHorizontal: wp(20),
    height: wp(50),
    backgroundColor: COLOR.SETTING_ITEM_BACKGROUND,
  },
  separatorLine: {
    height: wp(1),
    backgroundColor: "white",
    opacity: 0.15,
  },
  emptyItemContainer: {
    height: wp(45),
    backgroundColor: "transparent",
  },
  itemContainer1: {
    flexDirection: "row",
    paddingHorizontal: wp(20),
    paddingBottom: wp(20),
  },
  logoutText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: COLOR.TEXT_SECONDARY_4,
    marginHorizontal: wp(10),
  },
  deleteText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: COLOR.SETTING_ITEM_DELETE_TEXT,
    marginHorizontal: wp(10),
  },
});
