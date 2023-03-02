import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingBottom: wp(20),
  },
  backButtonContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    // paddingTop: (height / 100) * 18,
    justifyContent: "center",
    paddingHorizontal: wp(37),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(42),
  },
  titleTop: {
    marginTop: wp(80),
  },
  selectionContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonSeparator: {
    width: wp(30),
  },
  footer: {
    marginBottom: wp(20),
    paddingHorizontal: wp(37),
  },
});
