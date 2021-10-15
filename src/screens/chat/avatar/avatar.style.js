import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  avatar: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    // backgroundColor: "red",
    marginRight: -wp(8),
  },
});
