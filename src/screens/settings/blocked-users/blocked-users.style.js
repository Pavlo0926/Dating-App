import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemSeparator: {
    height: wp(10),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp(25),
  },
  itemImage: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    marginHorizontal: wp(13),
  },
  itemName: {
    fontSize: wp(14),
    fontWeight: "600",
    color: "white",
  },
  itemSubName: {
    fontSize: wp(10),
    fontWeight: "600",
    color: "#ABA7D5",
  },
  itemButton: {
    height: wp(25),
    borderRadius: wp(15),
    backgroundColor: "#ABA7D5",
    justifyContent: "center",
    alignItems: "center",
  },
  itemButtonText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "700",
    color: "#312446",
    paddingHorizontal: wp(13),
  },
});
