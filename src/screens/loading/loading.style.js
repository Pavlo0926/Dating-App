import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  logo: {
    width: wp(150),
    height: wp(150),
    resizeMode: "contain",
  },

  webContainer: {
    width: 250,
    height: "100%",
  },
  webView: {
    backgroundColor: "transparent",
  },
});
