import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -wp(60),
  },
  headerIcon: {
    width: wp(25),
    height: wp(25),
    resizeMode: "stretch",
    marginRight: wp(9),
  },
  headerText: {
    fontSize: wp(14),
    fontWeight: "bold",
    color: "#01FF8D",
  },

  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    marginBottom: wp(50),
    paddingHorizontal: wp(3),
    flexWrap: "wrap",
    flexDirection: "row",
  },
  itemContainer: {
    width: width / 2 - wp(4),
    height: parseInt((((width - wp(34)) / 2) * wp(240)) / wp(170), 10),
    marginBottom: wp(12),
  },
  itemSeparator: {
    height: wp(10),
  },
  zIndexZero: {
    zIndex: 0,
  },
  zIndexHigh: {
    zIndex: 999,
  },
  overlayDislike: {
    zIndex: 99999,
    marginTop: parseInt((((width - wp(34)) / 2) * wp(240)) / wp(170), 10) / 2 - 40,
    marginLeft: (width) / 4 - 40,
  },
  overlayLike: {
    zIndex: 99999,
    marginTop: parseInt((((width - wp(34)) / 2) * wp(240)) / wp(170), 10) / 2 - 40,
    marginLeft: (width) / 4 - 40,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: wp(70),
  },
  emptyText: {
    color: "#ABA7D5",
    fontSize: wp(14),
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonContainer: {
    position: "absolute",
    left: wp(45),
    right: wp(45),
    bottom: wp(75),
  },
  plusMark: {
    position: "absolute",
    top: -wp(2),
    bottom: -wp(2),
    left: wp(17),
    width: width - wp(124),
  },
  plusImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  boostIcon: {
    width: wp(16),
    height: wp(16),
    resizeMode: "contain",
    tintColor: "white",
    marginRight: wp(6),
  },
});
