import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    marginHorizontal: wp(20),
  },
  avatarImage: {
    width: wp(90),
    height: wp(90),
    borderRadius: wp(45),
  },
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: wp(10),
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: wp(20),
    fontWeight: "bold",
    color: "white",
    marginRight: wp(5),
  },
  badgeImage: {
    width: wp(14),
    height: wp(14),
    marginLeft: wp(5),
  },
  usernameText: {
    fontSize: wp(14),
    fontWeight: "700",
    color: "#ABA7D5",
    marginTop: -wp(2),
  },
  friendsContainer: {
    height: wp(26),
    borderRadius: wp(13),
    paddingHorizontal: wp(10),
    marginTop: wp(8),
  },
  friendsIconImage: {
    width: wp(12),
    height: wp(12),
  },
  friendsCountText: {
    fontSize: wp(10),
    fontWeight: "bold",
    marginLeft: wp(5),
  },
});
