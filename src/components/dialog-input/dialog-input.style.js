import { StyleSheet, Platform, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { FontHelper } from "@helpers";

export const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        backgroundColor: "rgba(0,0,0,0.62)",
      },
    }),
  },
  modal_container: {
    ...Platform.select({
      ios: {
        backgroundColor: "#E3E6E7",
        borderRadius: wp(22),
        minWidth: width - wp(30),
      },
      android: {
        backgroundColor: "#fff",
        elevation: wp(24),
        minWidth: width - wp(30),
        borderRadius: wp(22),
      },
    }),
  },
  modal_body: {
    padding: 0,
  },
  title_modal: {
    fontWeight: "bold",
    fontSize: wp(22),
    color: "white",
    marginTop: wp(30),
    textAlign: "center",
  },
  message_modal: {
    fontFamily: "OpenSans",
    fontSize: wp(16),
    color: "#ABA7D5",
    textAlign: "center",
    marginBottom: wp(20),
  },
  input_container: FontHelper.font({
    textAlign: "left",
    fontSize: wp(14),
    fontWeight: "bold",
    color: "rgba(0,0,0,1)",
    height: wp(35),
    borderRadius: wp(18),
    backgroundColor: "white",
    marginHorizontal: wp(28),
    marginBottom: wp(35),
  }),
  btn_container: {
    flex: 1,
    justifyContent: "center",
    borderTopWidth: wp(1),
    borderColor: "rgba(255, 255, 255, 0.15)",
    maxHeight: wp(100),
  },
  divider_btn: {
    height: wp(1),
    backgroundColor: "white",
    opacity: 0.15,
  },
  touch_modal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_modal_left: {
    fontFamily: "OpenSans",
    fontSize: wp(16),
    color: "white",
    paddingLeft: wp(8.5),
  },
  btn_modal_right: {
    fontFamily: "OpenSans",
    fontSize: wp(16),
    color: "#DC2E2E",
    paddingLeft: wp(8.5),
  },
  noneHeight: {
    height: 0,
  },
});
