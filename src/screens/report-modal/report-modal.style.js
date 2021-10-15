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

  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingHorizontal: wp(15),
    paddingTop: wp(50),
    paddingBottom: wp(18),
    minHeight: 200,
  },

  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp(22),
  },
  descriptionText: {
    color: "#ABA7D5",
    fontWeight: "600",
    fontSize: wp(16),
    paddingTop: wp(5),
    paddingBottom: wp(10),
  },

  typeButton: {
    height: wp(35),
    backgroundColor: "#E8E6FF",
    borderRadius: wp(16),
    marginBottom: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  typeButtonSelect: {
    backgroundColor: "#617FFF",
  },
  typeButtonText: {
    color: "#0B0516",
    fontWeight: "600",
    fontSize: wp(12),
  },

  reportContentText: FontHelper.font({
    borderRadius: wp(22),
    height: wp(80),
    marginHorizontal: wp(20),
    marginTop: wp(20),
    backgroundColor: "#312446",
    paddingHorizontal: wp(15),
    paddingTop: wp(10),
    fontSize: wp(10),
    color: "#ABA7D5",
    textAlignVertical: "top",
  }),

  reportButton: {
    height: wp(35),
    backgroundColor: "#E8E6FF",
    borderRadius: wp(16),
    justifyContent: "center",
    alignItems: "center",
    margin: wp(20),
  },
  reportButtonText: {
    color: "#0B0516",
    fontWeight: "bold",
    fontSize: wp(16),
  },
  disabledReport: {
    opacity: 0.5,
  },
});
