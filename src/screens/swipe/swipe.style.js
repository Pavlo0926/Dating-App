import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heartIcon: {
    width: wp(120),
    height: wp(120),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -wp(50),
  },
  topActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingBottom: wp(50),
  },

  noUsers: {
    fontSize: wp(24),
    fontWeight: "600",
    color: "white",
  },

  matchesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(11, 5, 22, 0.5)",
  },

  tutorialContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(11, 5, 22, 0.5)",
    flexDirection: "row",
    alignItems: "center",
  },
  tutorialSeperator: {
    width: 1,
    height: "100%",
    backgroundColor: "white",
  },
  tutorialPointerLeft: {
    alignItems: "center",
    flex: 140,
  },
  tutorialPointerRight: {
    alignItems: "center",
    flex: 235,
  },
  tutorialText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "600",
    color: "white",
  },
});
