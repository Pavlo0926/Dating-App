import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  usersList: {
    marginTop: -wp(5),
    marginLeft: -wp(5),
    minHeight: wp(50),
  },
  usersListContentContainerStyle: {
    paddingHorizontal: wp(10),
  },
  itemSeparator: {
    width: wp(10),
  },
  itemContainer: {
    padding: wp(5),
  },
  itemImageSpotlight: {
    width: wp(50),
    height: wp(50),
    // borderWidth: wp(2),
    borderRadius: wp(50),
    // borderColor: COLOR.LIVE_USER_SPORTLIGHT_BORDER,
    backgroundColor: "#0000",
  },
  itemImage: {
    width: wp(50),
    height: wp(50),
    borderWidth: wp(2),
    borderRadius: wp(50),
    borderColor: COLOR.LIVE_USER_BORDER,
    backgroundColor: "#0000",
  },
  nameText: {
    fontSize: wp(9),
    fontWeight: "600",
    color: "#ABA7D5",
    textAlign: "center",
    marginTop: wp(3),
  },

  circleOne: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: wp(16),
    height: wp(16),
    borderRadius: wp(16),
    backgroundColor: "#DD00FF",
  },
  circleTwo: {
    position: "absolute",
    right: wp(18.8),
    bottom: -wp(2.5),
    width: wp(8),
    height: wp(8),
    borderRadius: wp(8),
    backgroundColor: "#DD00FF",
  },
  circleThree: {
    position: "absolute",
    right: wp(16.8),
    bottom: wp(10),
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5),
    backgroundColor: "#DD00FF",
  },
});
