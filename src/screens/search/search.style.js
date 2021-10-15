import { StyleSheet } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    height: wp(35),
    marginRight: wp(20),
    backgroundColor: "white",
    borderRadius: wp(20),
    borderWidth: wp(2),
    borderColor: COLOR.SEARCH_INPUT_BORDER,
  },
  iconContainer: {
    width: wp(30),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: wp(5),
    paddingTop: 1,
  },
  inputField: FontHelper.font({
    flex: 1,
    fontSize: wp(12),
    padding: 0,
    fontWeight: "600",
    color: COLOR.SEARCH_INPUT_PLACEHOLDER,
  }),

  filterContainer: {
    marginTop: wp(10),
    marginBottom: wp(20),
    marginHorizontal: wp(20),
  },
  filterButtonContainer: {
    height: wp(25),
    paddingHorizontal: wp(10),
    justifyContent: "center",
  },
  activeButton: {
    borderRadius: wp(13),
    backgroundColor: "#312446",
  },
  separator: {
    width: wp(10),
  },
  filterText: {
    fontWeight: "600",
    fontSize: wp(12),
    color: COLOR.TEXT_SECONDARY_4,
  },

  masonryContainer: {
    marginTop: wp(5),
    marginHorizontal: wp(5),
  },
  liveItemContainer: {
    flexDirection: "column",
    backgroundColor: COLOR.LIVE_ITEM_BACKGROUND,
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
    borderTopLeftRadius: wp(22),
    borderTopRightRadius: wp(22),
    overflow: "hidden",
    marginHorizontal: wp(5),
    marginBottom: wp(10),
  },

  sectionContainer: {},
  sectionText: {
    fontWeight: "bold",
    fontSize: wp(16),
    color: "white",
    paddingHorizontal: wp(10),
    paddingTop: wp(5),
  },
  showAllContainer: {
    margin: wp(20),
  },
  showAllText: {
    fontFamily: "OpenSans",
    fontSize: wp(13),
    color: COLOR.TEXT_SECONDARY_4,
  },
});
