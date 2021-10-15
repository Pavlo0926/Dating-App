import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dateText: {
    fontWeight: "bold",
    color: "#ABA7D5",
    fontSize: wp(14),
  },
  activeDateText: {
    fontWeight: "bold",
    color: "#150A26",
    fontSize: wp(14),
  },
  spacerView: {
    width: wp(5),
  },
});
