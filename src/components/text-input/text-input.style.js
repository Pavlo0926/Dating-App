import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    // flex: 1,
  },
  inputField: FontHelper.font({
    height: wp(35),
    fontSize: wp(14),
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
    paddingVertical: 0,
    paddingHorizontal: wp(18),
    borderRadius: wp(18),
    backgroundColor: COLOR.TEXT_INPUT_BACKGROUND,
  }),
});
