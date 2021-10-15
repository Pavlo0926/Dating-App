import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  currentItem: {
    flex: 1,
    borderRadius: wp(22),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9995,
  },

  contentContainer: {
    zIndex: 9994,
    position: "absolute",
    backgroundColor: "#ABA7D5",
    top: 0,
    left: 0,
    right: 0,
    height: wp(200),
    borderRadius: wp(22),
  },

  spacer: {
    height: wp(50),
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: wp(20),
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
  },

  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: wp(10),
  },
  itemText: {
    fontFamily: "OpenSans",
    fontSize: wp(11),
    color: "#0B0516",
  },
  itemTextPadding: {
    paddingLeft: wp(10),
    paddingRight: wp(15),
  },

  arrowDown: {
    position: "absolute",
    right: wp(9),
    borderTopWidth: wp(4),
    borderRightWidth: wp(4),
    borderBottomWidth: 0,
    borderLeftWidth: wp(4),
    borderTopColor: "#0B0516",
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
},
});
