import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  headerTitleContainer: {
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: wp(16),
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
  },
  onlineIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: COLOR.FRIEND_ONLINE_ICON_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIcon: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
  },

  searchContainer: {
    height: wp(35),
  },
  searchInput: {
    borderWidth: 0,
  },
});
