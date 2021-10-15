import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Touchable, Image, ImageZoomViewer } from "@components";
import Modal from "react-native-modal";
import Images from "@assets/Images";

import styles from "./zoom-image-modal.style";

class ZoomImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.onSwipeComplete}>
            <View style={[styles.flexFill, styles.darkView]} />
          </Touchable>
        }
        backdropOpacity={1}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        swipeDirection={["down", "up"]}
        swipeThreshold={100}
        useNativeDriver={false}
        propagateSwipe={false}
        style={styles.container}
      >
        <View style={styles.flexFill} pointerEvents={"box-none"}>
          <ImageZoomViewer imageUrl={{ uri: this.props.zoomImage }} />
          {this.state.loading &&
          <ActivityIndicator color={"white"} size={"small"} style={styles.loadingIndicator} />}
          <Touchable
            style={[styles.closeButton, { top: this.props.insets.top + 15 }]}
            onPress={this.props.onSwipeComplete}
          >
            <Image source={Images.app.icCross} style={styles.closeImage} />
          </Touchable>
        </View>
      </Modal>
    );
  }
}

export default ZoomImageModal;
