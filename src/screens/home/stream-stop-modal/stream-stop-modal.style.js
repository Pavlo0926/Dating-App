import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  modalContainer: {
    borderRadius: wp(20),
  },

  titleText: {
    color: "white",
    fontSize: wp(22),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(25),
  },
  messageText: {
    color: "#ABA7D5",
    fontSize: wp(16),
    fontWeight: "600",
    textAlign: "center",
    marginTop: wp(3),
    marginHorizontal: wp(28),
    minHeight: wp(38),
  },

  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: wp(24),
    marginBottom: wp(30),
    marginTop: wp(16),
  },
  button: {
    flex: 1,
  },
  buttonMargin: {
    marginLeft: wp(20),
  },
  leaveButton: {
    backgroundColor: "#FF0036",
  },
  leaveText: {
    color: "white",
  },
});
