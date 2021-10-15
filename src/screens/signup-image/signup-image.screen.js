import React, { useState } from "react";
import { Image, NativeModules, View } from "react-native";
import {
  GradientButton,
  ProgressBar,
  Screen,
  SolidButton,
  Text,
  Touchable,
  NotificationModal
} from "@components";
import styles from "./signup-image.style.js";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import Images from "@assets/Images";

const SignupImage: () => React$Node = props => {
  const [visibleNotification, setVisibleNotification] = useState(false);
  let actionSheetRef = React.createRef();
  let currentImageIndex = 1;

  const onPressUpload = (index) => {
    if (index === 0) {
      if (props.picture1) {
        if (props.picture2) {
          currentImageIndex = 3;
        } else {
          currentImageIndex = 2;
        }
      } else {
        currentImageIndex = 1;
      }
    } else {
      currentImageIndex = index;
    }
    actionSheetRef.show();
  };

  const onSelectImage = index => {
    const options = {
      width: 600,
      height: 800,
      cropping: true,
      compressImageQuality: 0.7,
      smartAlbums: ['PhotoStream', 'Generic', 'Panoramas', 'Videos', 'Favorites', 'Timelapses', 'AllHidden', 'RecentlyAdded', 'Bursts', 'SlomoVideos', 'UserLibrary', 'SelfPortraits', 'Screenshots', 'DepthEffect', 'LivePhotos', 'Animated', 'LongExposure'],
    };

    if (index === 0) {
      ImagePicker.openCamera(options).then(image => {
        onUploadImage(image);
      });
    } else if (index === 1) {
      ImagePicker.openPicker(options).then(image => {
        onUploadImage(image);
      });
    }
  };

  const onUploadImage = data => {
    let photoUriSplit = data.path.split("/");
    NativeModules.ImageDetector.check(data.path, (value) => {console.log(value);
      if (value === "SFW") {
        const image = {
          uri: data.path,
          name: photoUriSplit[photoUriSplit.length - 1],
          type: data.mime,
        };
        if (currentImageIndex === 1) {
          props.setPicture1(image);
        } else if (currentImageIndex === 2) {
          props.setPicture2(image);
        } else {
          props.setPicture3(image);
        }
      } else {
        setVisibleNotification(true);
      }
    });
    
  };

  const goBack = () => {
    props.navigation.goBack();
  };
  const navigateNext = () => {
    props.navigation.navigate("SIGNUP_PHONE_NUMBER", {});
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar width={80} />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Show us who you are!</Text>
          <Text style={styles.subTitleText}>Upload a profile picture.</Text>

          <View style={styles.imageUploadContainer}>
            <View style={styles.imagesContainer}>
              <Touchable
                style={[styles.imageContainer, props.picture1 ? {} : styles.imageSelected]}
                onPress={() => onPressUpload(1)}>
                {props.picture1 ? (
                  <Image
                    source={{ uri: props.picture1.uri }}
                    style={styles.imageContainer}
                  />
                ) : (
                  <Image source={Images.app.icPlus} style={styles.plusIcon} />
                )}
              </Touchable>

              <Touchable
                style={[styles.imageContainer, props.picture2 ? {} : props.picture1 ? styles.imageSelected : styles.imageNone]}
                disabled={props.picture1 ? false : true}
                onPress={() => onPressUpload(2)}>
                {props.picture2 ? (
                  <Image
                    source={{ uri: props.picture2.uri }}
                    style={styles.imageContainer}
                  />
                ) : (
                  <Image source={Images.app.icPlus} style={props.picture1 ? styles.plusIcon : styles.plusWhite} />
                )}
              </Touchable>

              <Touchable
                style={[styles.imageContainer, props.picture3 ? {} : props.picture2 ? styles.imageSelected : styles.imageNone]}
                disabled={props.picture2 ? false : true}
                onPress={() => onPressUpload(3)}>
                {props.picture3 ? (
                  <Image
                    source={{ uri: props.picture3.uri }}
                    style={styles.imageContainer}
                  />
                ) : (
                  <Image source={Images.app.icPlus} style={props.picture2 ? styles.plusIcon : styles.plusWhite} />
                )}
              </Touchable>
            </View>

            <View style={styles.imageSeparator} />

            <View style={styles.imageUploadButton}>
              <SolidButton text={"Upload"} onPress={() => onPressUpload(0)} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            disabled={!props.picture1}
            onPress={navigateNext}
            text={"Continue"}
          />
        </View>

        <ActionSheet
          ref={o => (actionSheetRef = o)}
          title={"Select Image"}
          options={["Take Photo...", "Choose from Library...", "Cancel"]}
          cancelButtonIndex={2}
          onPress={index => onSelectImage(index)}
        />
        
        <NotificationModal 
          isVisible={visibleNotification}
          title={"This photo can't be used here."}
          message={""}
          logoIcon={Images.app.icInfo}
          logoBackground={"#ABA7D5"}
          buttonColors={["#ABA7D5", "#ABA7D5"]}
          buttonText={"Okay"}
          buttonTextStyle={"#0B0516"}
          buttonContainerStyle={{marginTop: 32}}
          onBack={() => setVisibleNotification(false)}
          onConfirm={(a, b) => setVisibleNotification(false)} />
      </View>
    </Screen>
  );
};

export default SignupImage;
