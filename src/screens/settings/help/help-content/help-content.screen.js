import React, { useState } from "react";
import { Platform, View, TextInput, KeyboardAvoidingView } from "react-native";
import { Screen, Text, Touchable, Image, AppAlert, KeyboardListener, SolidButton } from "@components";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import { requestHelp } from "@redux/api";
import Images from "@assets/Images";

import Header from "../../header";
import styles from "./help-content.style";
import { SafeAreaView } from "react-navigation";

const HelpContentScreen: () => React$Node = props => {
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboardShowing, setKeyboardShowing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  let actionSheet = React.createRef();
  let helpType = props.navigation.state.params.type;
  let title = "Ask your question below.";
  if (helpType === 2) {
    title = "Report your bug below.";
  } else if (helpType === 3) {
    title = "Report your safety concern below.";
  } else if (helpType === 4) {
    title = "Write your suggestion below.";
  }

  const onInit = () => {
    setVisibleAlert(false);
    setContent("");
    setSelectedFile(null);
  }

  const onSelectImage = (index) => {
    const options = {
      compressImageQuality: 0.7,
      smartAlbums: ['PhotoStream', 'Generic', 'Panoramas', 'Videos', 'Favorites', 'Timelapses', 'AllHidden', 'RecentlyAdded', 'Bursts', 'SlomoVideos', 'UserLibrary', 'SelfPortraits', 'Screenshots', 'DepthEffect', 'LivePhotos', 'Animated', 'LongExposure'],
    };

    if (index === 0) {
      ImagePicker.openCamera(options).then(image => {
        setSelectedFile(image);
      });
    } else if (index === 1) {
      ImagePicker.openPicker(options).then(image => {
        setSelectedFile(image);
      });
    }
  }

  const onSend = () => {
    let params = new FormData();
    params.append("type", props.navigation.state.params.type);
    params.append("content", content);
    if (selectedFile) {
      params.append("file", selectedFile);
    }
    setLoading(true);
    requestHelp(params, props.token).then((res) => {
      setVisibleAlert(true);
      setLoading(false);
    }).catch(e => {
      setLoading(false);
      console.log("Help", e);
    });
  }

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
      <KeyboardAvoidingView style={styles.flexFill}
        behavior={Platform.OS === "ios" ? "height" : "height"}>
        <Header title={""} onBack={props.navigation.goBack} />

        <View 
          style={[styles.contentContainer, keyboardShowing ? styles.contentMarginZero : styles.contentMargin]}>
          <Text style={styles.titleText}>{title}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={content}
              style={styles.inputField}
              placeholder={"Enter your text here..."}
              placeholderTextColor={"#ABA7D5"}
              multiline
              onChangeText={(text) => setContent(text)} />
          </View>

          <Touchable style={styles.attachButtonContainer} onPress={() => actionSheet.show()}>
            {selectedFile === null && <Image source={Images.app.icPlus} style={styles.plusIcon} />}
            <Text style={styles.attachButtonText} numberOfLines={1}>
              {selectedFile === null ? "Attach a file" : `Attach the ${selectedFile.filename}${selectedFile.filename}${selectedFile.filename}${selectedFile.filename}${selectedFile.filename}`}
            </Text>
          </Touchable>
          <View style={styles.buttonContainer}>
            <SolidButton
              text={"Send"}
              textStyle={styles.buttonText}
              containerStyle={styles.sendButton}
              onPress={() => onSend()}
              disabled={loading}
              loading={loading}
              loadingColor="#0B0516">
            </SolidButton>
          </View>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
      <KeyboardListener 
        onWillShow={() => setKeyboardShowing(true)}
        onWillHide={() => setKeyboardShowing(false)}
        onDidShow={() => Platform.OS === "android" && setKeyboardShowing(true)}
        onDidHide={() => Platform.OS === "android" && setKeyboardShowing(false)}/>
      <ActionSheet
        ref={o => (actionSheet = o)}
        title={"Select"}
        options={["Take Photo...", "Choose from Library...", "Cancel"]}
        cancelButtonIndex={2}
        onPress={index => onSelectImage(index)}
      />
      <AppAlert 
        isVisible={visibleAlert}
        onDismiss={() => {
          onInit();
          props.navigation.state.params.onGoBack();
          props.navigation.goBack();
        }}
        title={"You successfully submitted a ticket."}
        content={"Thanks. We will get back to you within 24 hours."} />
    </Screen>
  );
};

export default HelpContentScreen;
