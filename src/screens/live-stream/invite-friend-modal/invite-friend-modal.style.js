import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  flexFill: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
  },

  backButton: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: COLOR.HEADER_BACKGROUND,
    top: wp(20),
    marginLeft: wp(20),
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  backImage: {
    width: wp(17),
    height: wp(12),
    resizeMode: "contain",
  },

  contentContainer: {
    marginTop: wp(50),
  },

  scrollView: {
    minHeight: height * 0.5,
    maxHeight: height * 0.8,
    marginBottom: wp(10),
  },

  searchContainer: {
    marginVertical: wp(10),
    marginHorizontal: wp(15),
    borderWidth: 0,
    height: wp(35),
  },

  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp(22),
    marginHorizontal: wp(15),
  },
  subtitleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp(16),
    marginTop: wp(20),
    marginHorizontal: wp(15),
  },

  peopleList: {
    marginTop: wp(8),
    paddingHorizontal: wp(15),
  },
});
