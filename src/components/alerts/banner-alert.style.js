import { Dimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginTop: wp(16),
  },

  contentContainer: {
    minHeight: wp(55),
    marginHorizontal: wp(5),
    borderRadius: wp(11),
    backgroundColor: COLOR.HEADER_BACKGROUND,
    paddingHorizontal: wp(17),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  userImage: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(18),
  },
  greenBorder: {
    borderWidth: wp(2),
    borderColor: "#01FF8D",
  },
  textContainer: {
    flex: 1,
    paddingLeft: wp(17),
    justifyContent: "center",
  },
  userName: {
    color: "white",
    fontSize: wp(9),
    fontWeight: "bold",
    marginRight: wp(8),
  },
  badgeIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(2),
    resizeMode: "contain",
  },
  textChat: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    color: "#ABA7D5",
  },

  circleButton: {
    width: wp(30),
    height: wp(30),
    marginLeft: wp(15),
  },

  flexRow: {
    flexDirection: "row",
  },
});
