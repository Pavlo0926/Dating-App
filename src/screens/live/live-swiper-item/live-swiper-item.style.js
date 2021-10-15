import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: wp(15),
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: wp(10),
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
    borderTopLeftRadius: wp(22),
    borderTopRightRadius: wp(22),
    overflow: "hidden",
  },
  userImage: {
    width: (screenWidth - wp(20)) / 4,
    height: (screenWidth - wp(20)) / 4,
  },

  dataContainer: {
    position: "absolute",
    left: wp(10),
    right: wp(10),
    top: 0,
    bottom: 0,
    borderRadius: wp(22),
    padding: wp(15),
    flexDirection: "column-reverse",
  },

  userName: {
    fontSize: wp(16),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    paddingRight: wp(15),
  },
  tagContainer: {
    flexDirection: "row",
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
