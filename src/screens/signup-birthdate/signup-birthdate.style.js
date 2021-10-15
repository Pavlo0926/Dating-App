import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
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
    paddingHorizontal: wp(37),
  },
  titleFieldContainer: {
    flex: 1,
    paddingTop: (height / 100) * 18,
    alignItems: "center",
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: wp(10),
  },

  buttonContainer: {
    marginBottom: wp(20),
  },
});
