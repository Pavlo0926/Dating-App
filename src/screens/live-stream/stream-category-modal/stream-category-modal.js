import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import { Touchable, Image } from "@components";
import { AppTags } from "@config";
import Images from "@assets/Images";

import styles from "./stream-cateogry-modal.style";
import StreamEmojiView from "../stream-emoji-view";

class StreamCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.stream.category,
    };
  }

  onModalHide = () => {
    this.props.updateStream(this.props.stream, this.props.token);
  };

  onChangeEmoji = item => {
    let stream = this.props.stream;
    stream.category = item.id;
    this.props.streamUpdateSuccess(stream);
    this.setState({ category: item.id });
  };

  render() {
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable
            style={styles.flexFill}
            onPress={() => {
              this.props.onDismiss && this.props.onDismiss();
            }}
          >
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          </Touchable>
        }
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        swipeDirection={"down"}
        onSwipeComplete={this.props.onDismiss}
        onModalWillHide={this.onModalHide}
        style={styles.modalContainer}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.emojiButtonContainer}>
            <View style={styles.emojiButton}>
              {/* <Image source={Images.live[AppTags[this.state.category].icon]} /> */}
              <View style={[styles.itemColorView, { backgroundColor: AppTags[this.state.category].color}]} />
            </View>
          </View>
          <View style={styles.emojiContainer}>
            <StreamEmojiView onChangeEmoji={this.onChangeEmoji} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default StreamCategoryModal;
