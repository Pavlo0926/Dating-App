import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  peopleContainer: {
    marginRight: wp(15),
    alignItems: "center",
    paddingBottom: wp(12),
    borderRadius: wp(22),
    overflow: "hidden",
  },
  peoplePicture: {
    width: wp(120),
    height: wp(160),
    borderRadius: wp(22),
  },
  peopleNameContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: wp(10),
    paddingVertical: wp(8),
  },
  peopleName: {
    color: "white",
    fontSize: wp(12),
    fontWeight: "600",
  },
  onlineMark: {
    width: wp(5),
    height: wp(5),
    marginTop: wp(2),
    marginLeft: wp(2),
    borderRadius: wp(3),
    backgroundColor: "#00FF77",
  },
  peopleAddContainer: {
    position: "absolute",
    bottom: 0,
  },
  peopleAdd: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    width: wp(16),
    height: wp(16),
    resizeMode: "contain",
    tintColor: "#0B0516",
  },
});
