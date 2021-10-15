import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.TEXT_INPUT_BACKGROUND,
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 16.96,
    paddingVertical: 5,
    minHeight: 45,
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.4,
  },
  disabledOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLOR.TRANSPARENT,
  },
  flexContainer: {
    flex: 1,
    marginRight: 5,
  },
  placeholderSmall: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT_PLACEHOLDER,
  },
  placeholderLarge: {
    // textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT_PLACEHOLDER,
  },
  required: {
    color: COLOR.WARNING,
  },
  value: {
    // textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
  },
});
