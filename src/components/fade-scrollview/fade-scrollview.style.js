import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  fadeSHContainer: {
    position: "absolute",
    start: 0,
    height: "100%",
  },
  fadeSVContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  fadeEHContainer: {
    position: "absolute",
    end: 0,
    height: "100%",
  },
  fadeEVContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default styles;
