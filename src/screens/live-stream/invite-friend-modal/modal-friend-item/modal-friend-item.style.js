import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  itemContainer: {
    height: wp(50),
    marginTop: wp(10),
    paddingHorizontal: wp(15),
    flex: 1,
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
  },
  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
  },
  itemContentContainer: {
    flex: 1,
    paddingHorizontal: wp(10),
    justifyContent: "center",
  },
  subject: {
    fontSize: wp(14),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
  },
  preview: {
    fontSize: wp(10),
    fontWeight: "600",
    color: COLOR.MESSAGE_PREVIEW,
  },
  timeContainer: {
    marginHorizontal: wp(10),
    justifyContent: "center",
  },
  addButton: {
    height: wp(25),
    width: wp(60),
  },
  addButtonText: {
    fontFamily: "OpenSans",
    fontWeight: "700",
    fontSize: wp(12),
    color: "black",
    lineHeight: wp(20),
  },
});
