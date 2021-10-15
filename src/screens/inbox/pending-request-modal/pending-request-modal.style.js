import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    borderRadius: wp(22),
  },
  headerContainer: {
    paddingRight: wp(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contentContainer: {
    paddingBottom: wp(30),
    paddingHorizontal: wp(20),
    marginTop: -wp(10),
  },
  titleText: {
    fontWeight: "bold",
    color: "white",
    fontSize: wp(18),
  },

  loadingContainer: {
    height: (screenHeight * wp(50)) / 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: wp(20),
  },

  requesterList: {
    marginVertical: wp(20),
    height: (screenHeight * wp(50)) / 100,
  },
  separator: {
    height: wp(12),
  },
  requestContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    marginRight: wp(12),
  },
  userContainer: {
    flex: 1,
  },
  firstname: {
    fontWeight: "700",
    fontSize: wp(14),
    color: "white",
  },
  username: {
    fontWeight: "700",
    fontSize: wp(10),
    color: COLOR.TEXT_SECONDARY_4,
  },
  crossButton: {
    width: wp(30),
    height: wp(30),
    backgroundColor: COLOR.TEXT_SECONDARY_4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(15),
    marginRight: wp(10),
  },
  crossIcon: {
    width: wp(14),
    height: wp(14),
    tintColor: "#0B0516",
    resizeMode: "contain",
  },
  checkButton: {
    width: wp(30),
    height: wp(30),
    backgroundColor: COLOR.LIVE_USER_BORDER,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(15),
  },
  checkIcon: {
    width: wp(17),
    height: wp(14),
    tintColor: "#0B0516",
    resizeMode: "contain",
  },
});
