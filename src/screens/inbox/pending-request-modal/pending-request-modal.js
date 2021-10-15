import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Screen, Text, BackButton, Touchable, Image } from "@components";
import FastImage from "react-native-fast-image";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import EventBus from "eventing-bus";

import Images from "@assets/Images";
import styles from "./pending-request-modal.style";

class PendingRequestModal extends Component {
  constructor(props) {
    super(props);
  }

  onDismissModal = () => {
    if (this.updateAction !== null) {
      this.updateAction();
    }
  };

  onLoadRequests = () => {
    // this.props.loadRequests(this.props.token);
    this.updateAction = EventBus.on("Friend_add", () => {
      this.props.loadRequests(this.props.token);
    });
  };

  onAcceptRequest = userId => {
    this.props.acceptRequest(userId, this.props.token);
    const { pendingFriends } = this.props;
    let requests = pendingFriends.filter(value => value._id !== userId);
    this.props.updatePendings(requests);
  };

  onRejectRequest = userId => {
    this.props.rejectRequest(userId, this.props.token);
    const { pendingFriends } = this.props;
    let requests = pendingFriends.filter(value => value._id !== userId);
    this.props.updatePendings(requests);
  };

  render() {
    const { isLoadingPendingFriends, pendingFriends } = this.props;
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.dismissModal}>
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          </Touchable>
        }
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        backdropTransitionOutTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        onModalShow={this.onLoadRequests}
        onModalHide={this.onDismissModal}
        swipeDirection={"down"}
        onSwipeComplete={this.props.dismissModal}
      >
        <Screen hasGradient style={styles.container}>
          <View style={styles.headerContainer}>
            <BackButton icon={Images.app.icBackLeft} onPress={this.props.dismissModal} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Pending Requests</Text>

            {isLoadingPendingFriends ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} color={"white"} />
              </View>
            ) : (
              <FlatList
                style={styles.requesterList}
                data={pendingFriends}
                keyExtractor={item => `pending-requests-${item._id}`}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item: item, index }) => (
                  <Touchable key={`pending-requests-${item._id}`}>
                    <View style={styles.requestContainer}>
                      <View style={styles.imageContainer}>
                        <FastImage
                          source={{ uri: item.images[0].path || item.avatar }}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.userContainer}>
                        <Text style={styles.firstname}>{item.first_name}</Text>
                        <Text style={styles.username}>{item.username}</Text>
                      </View>
                      <Touchable
                        style={styles.crossButton}
                        onPress={() => {
                          this.onRejectRequest(item._id);
                        }}
                      >
                        <Image source={Images.app.icCross} style={styles.crossIcon} />
                      </Touchable>
                      <Touchable
                        style={styles.checkButton}
                        onPress={() => {
                          this.onAcceptRequest(item._id);
                        }}
                      >
                        <Image source={Images.app.icCheck} style={styles.checkIcon} />
                      </Touchable>
                    </View>
                  </Touchable>
                )}
              />
            )}
          </View>
        </Screen>
      </Modal>
    );
  }
}

export default PendingRequestModal;
