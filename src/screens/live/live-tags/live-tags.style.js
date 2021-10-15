import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  usersList: {
    marginTop: 0,
    marginBottom: wp(20),
  },
  usersListContentContainerStyle: {
    paddingHorizontal: wp(10),
  },
  itemSeparator: {
    width: wp(10),
  },
  itemContainer: {
    justifyContent: "center",
  },
  itemTextContainer: {
    width: wp(50),
    height: wp(30),
    marginRight: wp(10),
    borderWidth: wp(2),
    borderRadius: wp(18),
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: wp(12),
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
  },
  itemImageContainer: {
    width: wp(36),
    height: wp(36),
    marginRight: wp(10),
    borderWidth: wp(2),
    borderRadius: wp(18),
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: wp(20),
    height: wp(20),
    resizeMode: "contain",
  },
  itemColorView: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
  },
  activeItem: {
    backgroundColor: COLOR.SEARCH_INPUT_BORDER,
  },
});
