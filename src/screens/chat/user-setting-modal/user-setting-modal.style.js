import { StyleSheet } from "react-native";
import { COLOR } from "@config";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  flexFill: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingHorizontal: wp(20),
    paddingTop: wp(15),
    paddingBottom: wp(10),
    marginHorizontal: wp(15),
    marginBottom: wp(20),
    borderRadius: wp(20),
  },

  titleText: {
    fontSize: wp(14),
    fontWeight: "600",
    color: "#ABA7D5",
    textAlign: "center",
    marginBottom: wp(20),
  },
  buttonContainer: {
    height: wp(35),
    marginBottom: wp(10),
  },
  unfriendButton: {
    backgroundColor: "#FF0036",
  },
  blockButton: {
    backgroundColor: "#312446",
  },
  cancelButton: {
    backgroundColor: "#ABA7D5",
  },
  buttonText: {
    color: "white",
    fontSize: wp(16),
    fontWeight: "bold",
  },

  seperator: {
    height: wp(10),
  },
});
