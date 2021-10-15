import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  itemDataContainer: {
    margin: wp(10),
  },
  userName: {
    fontSize: wp(12),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    paddingRight: wp(15),
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  membersContainer: {
    height: wp(18),
    flexDirection: "row",
    paddingHorizontal: wp(6),
    borderRadius: wp(9),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(5),
  },
  memberIcon: {
    width: wp(12),
    height: wp(12),
    resizeMode: "contain",
  },
  memberCount: {
    fontSize: wp(12),
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
    paddingLeft: wp(2),
  },
  tagImages: {
    flexDirection: "row",
  },
  tagImage: {
    width: wp(13),
    height: wp(13),
    marginRight: wp(5),
  },
  itemColorView: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    marginRight: wp(5),
  },
});
