import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingTop: (height / 100) * 18,
    paddingHorizontal: wp(37),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: wp(16),
    color: "#ABA7D5",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: wp(25),
  },
  imageUploadContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    width: width - wp(55),
    height: (width - wp(75)) / 2,
    justifyContent: "space-between",
  },
  imageContainer: {
    width: (width - wp(75)) / 3,
    height: (width - wp(75)) / 2,
    borderRadius: wp(22),
    backgroundColor: "#0B0516",
    justifyContent: "center",
    alignItems: "center",
  },
  imageSelected: {
    backgroundColor: "white",
  },
  imageNone: {
    borderWidth: wp(2),
    borderColor: "white",
  },
  plusIcon: {
    width: wp(21),
    height: wp(21),
    tintColor: "#0B0516",
  },
  plusWhite: {
    width: wp(21),
    height: wp(21),
    tintColor: "white",
  },
  imageSeparator: {
    height: wp(25),
  },
  imageUploadButton: {
    width: wp(180),
    alignSelf: "center",
  },
  footer: {
    paddingHorizontal: wp(37),
    paddingBottom: wp(40),
  },
});
