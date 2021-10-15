import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    width: wp(50),
    height: wp(50),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: wp(30),
  },
  micContainer: {
    width: wp(18),
    height: wp(18),
    backgroundColor: "#0B0516",
    borderRadius: wp(9),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  mic: {
    width: wp(10),
    height: wp(10),
    resizeMode: "contain",
  },
  muted: {
    backgroundColor: "#FF0036",
  },
});
