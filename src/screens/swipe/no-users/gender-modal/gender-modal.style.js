import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  container: {
    borderRadius: wp(22),
    paddingBottom: wp(20),
  },

  buttonContainer: {
    marginHorizontal: wp(22),
    marginVertical: wp(15),
  },

  spacer: {
    height: wp(15),
  },
});
