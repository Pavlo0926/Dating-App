import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, FontHelper } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(20),
  },
  contentMargin: {
    marginTop: hp(80),
  },
  contentMarginZero: {
    marginTop: hp(10),
  },
  titleText: {
    color: "white",
    fontSize: wp(20),
    fontWeight: "bold",
  },

  inputContainer: {
    marginTop: wp(20),
    backgroundColor: "#312446",
    borderRadius: wp(15),
  },
  inputField: FontHelper.font({
    height: wp(160),
    marginHorizontal: wp(16),
    marginVertical: wp(9),
    color: "#ABA7D5",
    fontWeight: "600",
  }),

  attachButtonContainer: {
    flexDirection: "row",
    height: wp(30),
    marginTop: wp(20),
    backgroundColor: "#ABA7D5",
    borderRadius: wp(18),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(15),
  },
  plusIcon: {
    width: wp(16),
    height: wp(16),
    marginRight: wp(8),
  },
  attachButtonText: {
    fontSize: wp(12),
    fontWeight: "600",
    color: "white",
  },
  buttonContainer: {
    height: wp(30),
    marginTop: wp(20),
  },
  sendButton: {
    height: wp(30),
    backgroundColor: "#E8E6FF",
  },
  buttonText: {
    fontSize: wp(12),
    fontWeight: "600",
    color: "#0B0516",
  },
});
