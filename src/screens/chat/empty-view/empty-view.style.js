import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scaleY: -1 }],
  },
  userImage: {
    width: wp(150),
    height: wp(150),
    borderRadius: wp(75),
  },
  contentView: {
    flexDirection: "row",
    marginTop: wp(13),
  },
  contentText: {
    color: "white",
    fontSize: wp(20),
    fontWeight: "bold",
  },
  heartIcon: {
    width: wp(22),
    height: wp(19),
    tintColor: "#01FF8D",
    resizeMode: "contain",
    marginLeft: wp(10),
  },
});
