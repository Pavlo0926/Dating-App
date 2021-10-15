import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-start",
  },
  flexFill: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
  },

  emojiButtonContainer: {
    flexDirection: "row-reverse",
    marginLeft: wp(200),
    marginTop: wp(10),
  },
  emojiButton: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: "#312446",
    justifyContent: "center",
    alignItems: "center",
  },
  itemColorView: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
  },

  emojiContainer: {
    marginHorizontal: wp(10),
    marginTop: wp(10),
  },
});
