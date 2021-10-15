import { StyleSheet } from "react-native";
import { COLOR } from "@config";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";

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
  requestContainer: {
    backgroundColor: COLOR.SEARCH_INPUT_BORDER,
    height: wp(26),
    paddingHorizontal: wp(10),
    borderRadius: wp(13),
    alignItems: "center",
    flexDirection: "row",
  },
  requestText: {
    fontWeight: "600",
    color: "white",
    fontSize: wp(12),
  },
  pendingCount: {
    marginLeft: wp(7),
    minWidth: wp(19),
    maxWidth: wp(25),
    height: wp(15),
    borderRadius: wp(7.5),
    paddingHorizontal: wp(5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00FF77",
  },
  pendingCountText: {
    fontSize: wp(10),
    fontWeight: "600",
  },

  contentContainer: {
    paddingTop: wp(30),
    paddingBottom: wp(50),
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    color: "white",
    fontSize: wp(18),
    textAlign: "center",
  },
  noteText: {
    fontWeight: "600",
    color: COLOR.TEXT_SECONDARY_4,
    fontSize: wp(14),
    textAlign: "center",
  },
  inputContainer: {
    marginTop: wp(30),
    marginBottom: wp(20),
    paddingHorizontal: wp(30),
    width: "100%",
  },
  usernameInput: FontHelper.font({
    height: wp(35),
    borderRadius: wp(18),
    paddingHorizontal: wp(18),
    backgroundColor: "white",
    color: "black",
    fontSize: wp(14),
    fontWeight: "600",
  }),
  buttonContainer: {
    width: wp(60),
  },
  addButton: {
    height: wp(25),
    marginBottom: wp(10),
  },
  addButtonText: {
    fontFamily: "OpenSans",
    fontWeight: "700",
    fontSize: wp(12),
    color: "black",
  },
  successText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: "#00FF77",
  },
  failText: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    color: COLOR.TEXT_SECONDARY_5,
  },

  subtitleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp(16),
    marginTop: wp(35),
    marginHorizontal: wp(30),
    alignSelf: "flex-start",
  },
  peopleList: {
    marginTop: wp(8),
    paddingLeft: wp(30),
    paddingRight: wp(15),
  },
  peopleContainer: {
    flex: 1,
    flexDirection: "row",
  },

  profileModal: {
    margin: 0,
  },
});
