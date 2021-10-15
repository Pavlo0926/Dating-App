import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  headerContainer: {
    // backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  header: {
    height: wp(60),
    flexDirection: "row",
  },
  backButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  backButtonTouchable: {
    width: wp(35),
    height: wp(35),
    justifyContent: "center",
    alignItems: "center",
  },
  headerContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    marginHorizontal: wp(10),
  },
  headerTitle: {
    fontSize: wp(14),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
  },
  reportButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  reportButtonTouchable: {
    width: wp(35),
    height: wp(35),
    justifyContent: "center",
    alignItems: "center",
  },
});
