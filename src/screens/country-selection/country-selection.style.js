import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  titleText: {
    color: "white",
    fontSize: wp(22),
    fontWeight: "bold",
    paddingHorizontal: wp(20),
    top: -wp(10),
  },

  locationContainer: {
    flexDirection: "column-reverse"
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: wp(10),
    marginHorizontal: wp(20),
  },
  locationRowText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: wp(14),
  },
  codePickerContainer: {
    height: wp(24),
  },
  codePicker: {
    width: wp(120),
    backgroundColor: "#E8E6FF",
  },
  codePickerContent: {
    borderRadius: wp(12),
  },
  spacerStyle: {
    height: wp(25),
  },
  flagStyle: {
    width: wp(23),
    height: wp(12),
  },

  // itemContainer: {
  //   flexDirection: "row",
  //   height: wp(36),
  //   paddingLeft: wp(10),
  //   paddingRight: wp(20),
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  // sortSelection: {
  //   width: wp(20),
  //   height: wp(20),
  //   borderRadius: wp(10),
  // },
  // sortNoSelection: {
  //   width: wp(20),
  //   height: wp(20),
  //   borderRadius: wp(10),
  //   borderWidth: wp(2),
  //   borderColor: "#E8E6FF",
  // },
  // itemText: {
  //   flex: 1,
  //   color: "white",
  //   fontFamily: "OpenSans",
  //   fontSize: wp(14),
  // },
  // flagIcon: {
  //   width: wp(15),
  //   height: wp(15),
  //   resizeMode: "contain",
  //   marginHorizontal: wp(8),
  // },

  // seperator: {
  //   height: 1,
  //   backgroundColor: "white",
  //   opacity: 0.15,
  // },

});
