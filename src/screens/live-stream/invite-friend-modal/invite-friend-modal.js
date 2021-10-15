import React, { Component } from "react";
import {
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import KeyboardManager from "react-native-keyboard-manager";
import Modal from "react-native-modal";
import { Screen, Touchable, Image, Text, SearchInput } from "@components";
import ModalFriendItem from "./modal-friend-item";
import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

import Images from "@assets/Images";

import styles from "./invite-friend-modal.style";

class InviteFriendsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitedUsers: [],
      newPeoples: [],
      searchKeyword: "",
    };
  }

  onModalShow = () => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
    }

    API.request({
      method: "post",
      url: `${API_ENDPOINTS.STREAM_NEW_PEOPLE}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data: null,
    }).then(response => {
      this.setState({ newPeoples: response.data.data });
    });

    this.props.loadFriends(this.props.token);
  };

  onModalHide = () => {
    if (Platform.OS === "ios" && this.props.keyboardDisable) {
      KeyboardManager.setEnable(false);
    }
  };

  onInvite = user => {
    const { invitedUsers } = this.state;
    if (!invitedUsers.includes(user.id)) {
      this.setState({ invitedUsers: [...invitedUsers, user.id] });
    }

    let data = new FormData();
    data.append("user_id", user.id);
    data.append("channel_id", this.props.stream.channel);
    API.request({
      method: "post",
      url: `${API_ENDPOINTS.STREAM_INVITE}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data,
    }).then(response => {
      console.log(response.data.data);
    });
  };

  renderFriends = () => {
    const { friends } = this.props;
    let filteredFriends = friends.filter((value) => value.id !== 0);
    if (this.state.searchKeyword !== "") {
      filteredFriends = friends.filter(value =>
        value.first_name.toLowerCase().includes(this.state.searchKeyword.toLowerCase()),
      );
    }
    return filteredFriends.map((friend, index) => {
      return (
        <ModalFriendItem
          user={friend}
          onInviteFriend={() => this.onInvite(friend)}
          invitedFriends={this.state.invitedUsers}
          key={`invite-item-${index}`}
        />
      );
    });
  };

  renderContent = () => {
    return (
      <View style={styles.container}>
        <Touchable
          style={styles.backButton}
          onPress={() => {
            this.props.onDismiss && this.props.onDismiss();
          }}
        >
          <Image source={Images.app.icBack} style={styles.backImage} />
        </Touchable>
        <Screen hasGradient style={styles.container}>
          <SafeAreaView style={styles.contentContainer}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Text style={styles.titleText}>Invite Friends</Text>

              <SearchInput
                onSearch={txt => this.setState({ searchKeyword: txt })}
                onRef={ref => {}}
                containerStyle={styles.searchContainer}
              />

              <Text style={styles.subtitleText}>Friends</Text>
              {this.renderFriends()}
            </ScrollView>
          </SafeAreaView>
        </Screen>
      </View>
    );
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
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        swipeDirection={"down"}
        onSwipeComplete={this.props.onDismiss}
        onModalShow={this.onModalShow}
        onModalWillHide={this.onModalHide}
        style={styles.modalContainer}
      >
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior={"height"} enabled>
            {this.renderContent()}
          </KeyboardAvoidingView>
        ) : (
          this.renderContent()
        )}
      </Modal>
    );
  }
}

export default InviteFriendsModal;
