import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  headerContainer: {
    height: wp(55),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(20),
  },
  backButton: {
    width: wp(30),
    height: wp(50),
    justifyContent: "center",
  },
  backButtonIcon: {
    width: wp(12),
    height: wp(18),
    resizeMode: "contain",
  },

  settingText: {
    fontSize: wp(22),
    fontWeight: "bold",
    color: "white",
    marginHorizontal: wp(20),
    marginBottom: wp(10),
  },
});
