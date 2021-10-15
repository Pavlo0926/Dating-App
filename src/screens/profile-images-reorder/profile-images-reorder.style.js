import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 30,
    height: 50,
    justifyContent: "center",
  },
  backButtonIcon: {
    width: 12,
    height: 18,
    resizeMode: "contain",
  },

  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 10,
  },

  dragContainer: {
    marginLeft: 10,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: (width - 80) / 3,
    aspectRatio: 2 / 3,
    borderRadius: 22,
  },
  deleteContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  deleteText: {
    fontWeight: "700",
    color: "red",
  },
  imageLoadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadingContainer: {
    width: (width - 80) / 3,
    aspectRatio: 2 / 3,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  hintText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  favContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  plusFav: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
