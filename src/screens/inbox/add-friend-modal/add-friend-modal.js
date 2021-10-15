import React, { Component } from "react";
import { View, Keyboard, ScrollView, Platform } from "react-native";
import {
  Screen,
  Text,
  BackButton,
  Touchable,
  GradientButton,
  TextInput,
  DiscoverPeopleItem,
} from "@components";
import KeyboardManager from "react-native-keyboard-manager";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import EventBus from "eventing-bus";
import { InboxTypes } from "@redux/actions";
import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

import { Notification } from "@helpers";
import Images from "@assets/Images";
import PendingRequestCountView from "../pending-request-count-view";
import ProfileView from "../../profile-view";
import styles from "./add-friend-modal.style";

class AddFriendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      requestSuccess: "none", // none, success, fail
      newPeoples: [],
      addingNewFriend: false,
      delayAdding: false,
      selectedUser: null,
      visibleProfile: false,
    };
  }

  componentDidMount() {
    this.addSuccessAction = EventBus.on(
      InboxTypes.ADD_FRIEND_SUCCESS,
      this.onAddingSuccess,
    );
    this.addFailureAction = EventBus.on(
      InboxTypes.ADD_FRIEND_FAILURE,
      this.onAddingFailure,
    );
  }

  componentWillUnmount() {
    this.addSuccessAction();
    this.addFailureAction();
  }

  onModalShow = () => {
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

    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
  };

  onAddingSuccess = () => {
    this.setState({ requestSuccess: "success" });
    this.setState({ addingNewFriend: false });
  };

  onAddingFailure = () => {
    this.setState({ requestSuccess: "fail" });
    this.setState({ addingNewFriend: false });
  };

  onBack = () => {
    this.props.dismissModal();
  };

  onAddFriend = user => {
    const { username } = this.state;
    const { token } = this.props;

    if (user === null && username === "") {
      Notification.alert("Please enter the username");
      return;
    }
    Keyboard.dismiss();
    if (user !== null) {
      this.setState({ addingNewFriend: true, delayAdding: true }, () => {
        setTimeout(() => {
          this.setState({ delayAdding: false });
        }, 1500);
      });
    }
    this.props.addFriend(user === null ? username : user.username, token);
    if (user !== null) {
      this.setState({
        newPeoples: this.state.newPeoples.filter(item => item.id !== user.id),
      });
    }
  };

  render() {
    const { username, requestSuccess, addingNewFriend, delayAdding } = this.state;
    const { isAddingFriend } = this.props;

    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.onBack}>
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          </Touchable>
        }
        onModalShow={this.onModalShow}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropTransitionOutTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        scrollHorizontal={true}
        swipeDirection='down'
        onSwipeComplete={this.onBack}
        onModalWillShow={() => this.setState({ username: "", requestSuccess: "none" })}
      >
        <Screen hasGradient style={styles.container}>
          <View style={styles.headerContainer}>
            <BackButton icon={Images.app.icBackLeft} onPress={this.onBack} />
            <Touchable onPress={this.props.pendingRequest}>
              <View style={styles.requestContainer}>
                <Text style={styles.requestText}>Pending Requests</Text>
                <PendingRequestCountView 
                  style={styles.pendingCount}
                  textStyle={styles.pendingCountText} />
              </View>
            </Touchable>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Add a friend</Text>
            <Text style={styles.noteText}>
              Enter their username to add them{"\n"}to your friends.
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={username}
                onChangeText={value =>
                  this.setState({ username: value, requestSuccess: "none" })
                }
                placeholder={"Username"}
                autoCapitalize={"none"}
              />
            </View>
            <View style={styles.buttonContainer}>
              <GradientButton
                onPress={() => this.onAddFriend(null)}
                loading={isAddingFriend && !addingNewFriend}
                containerStyle={styles.addButton}
                textStyle={styles.addButtonText}
                text={"Add"}
              />
            </View>
            {requestSuccess === "success" && (
              <Text style={styles.successText}>Friend Request successful!</Text>
            )}
            {requestSuccess === "fail" && (
              <Text style={styles.failText}>User doesn't exist or already sent</Text>
            )}

            <Text style={styles.subtitleText}>Discover New People</Text>
            <ScrollView horizontal contentContainerStyle={styles.peopleList}>
              <View style={styles.peopleContainer} onStartShouldSetResponder={() => true}>
                {this.state.newPeoples.map(item => {
                  return (
                    <DiscoverPeopleItem
                      user={item}
                      key={`new-people-${item.phone}`}
                      onAddPeople={() => this.onAddFriend(item)}
                      disabled={addingNewFriend || delayAdding}
                      onShowProfile={() => this.setState({selectedUser: item, visibleProfile: true})}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <Modal isVisible={this.state.visibleProfile} style={styles.profileModal}>
            <View style={styles.flexFill}>
              {this.state.selectedUser && (
                <ProfileView
                  user={this.state.selectedUser}
                  goBack={() => this.setState({ visibleProfile: false, selectedUser: null })}
                />
              )}
            </View>
          </Modal>
        </Screen>
      </Modal>
    );
  }
}

export default AddFriendModal;
