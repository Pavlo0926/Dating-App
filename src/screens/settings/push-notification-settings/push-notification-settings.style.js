import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    borderRadius: wp(22),
    paddingBottom: wp(24),
    minHeight: wp(500),
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  safeAreaContainer: {
    flex: 1,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPadding: {
    padding: wp(20),
  },

  titleText: {
    flex: 1,
    color: "white",
    fontSize: wp(14),
    fontWeight: "400",
  },

  separator: {
    height: wp(1),
    backgroundColor: "white",
    opacity: 0.15,
  },
});
