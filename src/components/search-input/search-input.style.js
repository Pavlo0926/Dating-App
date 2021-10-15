import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: wp(20),
    borderWidth: wp(2),
    borderColor: COLOR.SEARCH_INPUT_BORDER,
  },
  iconContainer: {
    width: wp(30),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: wp(5),
    paddingTop: 1,
  },
  inputField: FontHelper.font({
    flex: 1,
    fontSize: wp(12),
    padding: 0,
    fontWeight: "600",
    color: COLOR.SEARCH_INPUT_PLACEHOLDER,
  }),
});
