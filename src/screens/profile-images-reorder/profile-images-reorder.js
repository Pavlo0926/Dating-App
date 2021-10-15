import React from "react";
import { View, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Screen, Touchable, Image, Text, DragSortableView } from "@components";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import LinearGradient from "react-native-linear-gradient";
import EventBus from "eventing-bus";
import { UserTypes } from "@redux/actions";
import { Notification } from "@helpers";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles from "./profile-images-reorder.style";

const { width } = Dimensions.get("window");

class OrderImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      scrollEnabled: true,
    };
    this.ActionSheet = React.createRef();
  }

  componentDidMount() {
    this.updateSuccessAction = EventBus.on(
      UserTypes.UPDATE_USER_SUCCESS,
      this.uploadingDone,
    );
    this.updateFailureAction = EventBus.on(
      UserTypes.UPDATE_USER_FAILURE,
      this.uploadingDone,
    );
  }

  componentWillUnmount() {
    this.updateSuccessAction();
    this.updateFailureAction();
  }

  uploadingDone = () => {
    this.setState({ uploading: false });
  };

  onAddNewImage = () => {
    this.ActionSheet.show();
  };

  onSelectImage = index => {
    const options = {
      width: 600,
      height: 800,
      cropping: true,
      compressImageQuality: 0.7,
    };

    if (index === 0) {
      ImagePicker.openCamera(options).then(image => {
        this.onUploadImage(image);
      });
    } else if (index === 1) {
      ImagePicker.openPicker(options).then(image => {
        this.onUploadImage(image);
      });
    }
  };

  onUploadImage = data => {
    let photoUriSplit = data.path.split("/");

    const image = {
      uri: data.path,
      name: photoUriSplit[photoUriSplit.length - 1],
      type: data.mime,
    };
    this.setState({ uploading: true }, () => {
      const params = new FormData();
      params.append("images[]", image);
      this.props.updateUser(params, this.props.token);
    });
  };

  onDeleteImage = imageId => {
    if (this.props.user.images.length === 1) return;
    Notification.confirmAlert("Delete", "Do you want to delete this image?", "OK", "Cancel", () => {
      this.props.deleteImage(imageId, this.props.token);
    });
  };

  onDragStart = () => {
    this.setState({
      scrollEnabled: false,
    });
  };

  onDragEnd = (startIndex, endIndex) => {
    this.setState({
      scrollEnabled: true,
    });
  };

  render() {
    const { uploading } = this.state;
    let showDelete = this.props.user.images.length > 1;

    let imageData = this.props.user.images;
    if (uploading) {
      imageData = [...this.props.user.images, { id: -1 }];
    }

    return (
      <Screen>
        <SafeAreaView style={styles.container}>
          <ScrollView
            bounces={false}
            scrollEnabled={this.state.scrollEnabled}
            style={styles.container}
          >
            <View style={styles.headerContainer}>
              <Touchable
                style={styles.backButton}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Image source={Images.app.icBackLeft} style={styles.backButtonIcon} />
              </Touchable>
              <Text style={styles.titleText}>
                {`${this.props.user.images.length} Images`}
              </Text>
            </View>

            <View style={styles.dragContainer}>
              <DragSortableView
                dataSource={imageData}
                parentWidth={width}
                childrenWidth={(width - 80) / 3}
                childrenHeight={(width - 80) / 2}
                marginChildrenBottom={15}
                marginChildrenLeft={10}
                marginChildrenRight={10}
                keyExtractor={(item, index) => item.id}
                renderItem={(item, index) => {
                  if (item.id === -1) {
                    return (
                      <View style={styles.uploadingContainer}>
                        <ActivityIndicator size={"small"} color={"white"} />
                      </View>
                    );
                  }
                  return (
                    <View style={styles.itemContainer}>
                      <Image source={{ uri: item.path }} style={styles.image} />
                      {showDelete && (
                        <Touchable
                          style={styles.deleteContainer}
                          onPress={() => this.onDeleteImage(item.id)}
                        >
                          <Text style={styles.deleteText}>X</Text>
                        </Touchable>
                      )}
                      {this.props.deletingImageId === item.id && (
                        <View style={styles.imageLoadingContainer}>
                          <ActivityIndicator size={"small"} color={"white"} />
                        </View>
                      )}
                    </View>
                  );
                }}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onDataChange={data => {
                  if (this.state.uploading) return;
                  let params = new FormData();
                  for (let i = 0; i < data.length; i++) {
                    data[i].sort = i + 1;
                    params.append(`sort[${data[i].id}]`, data[i].sort);
                  }
                  let user = this.props.user;
                  user.images = data;
                  this.props.updateUserImage(user);
                  this.props.reorderImages(params, this.props.token);
                }}
              />
            </View>
            <Text style={styles.hintText}>{"Long press to reorder"}</Text>
          </ScrollView>

          <View style={styles.favContainer}>
            <Touchable onPress={this.onAddNewImage}>
              <LinearGradient
                colors={GRADIENT.BUTTON}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.plusFav}
              >
                <Image source={Images.app.icPlus} />
              </LinearGradient>
            </Touchable>
          </View>
        </SafeAreaView>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Select Image"}
          options={["Take Photo...", "Choose from Library...", "Cancel"]}
          cancelButtonIndex={2}
          onPress={index => this.onSelectImage(index)}
        />
      </Screen>
    );
  }
}

export default OrderImages;
