import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import { Screen, Image, Text, Touchable, NotificationModal } from "@components";
import { SCREENS } from "@constants";
import NewFriends from "./new-friends";
import Messages from "./messages";
import AddFriendModal from "./add-friend-modal";
import PendingRequestModal from "./pending-request-modal";
import PendingRequestCountView from "./pending-request-count-view";
import ReportModal from "../report-modal";
import { API, widthPercentageToDP as wp } from "@helpers";
import { API_ENDPOINTS } from "@config";
import styles from "./inbox.style.js";

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportUser: null,
      visibleReport: false,
      visibleAddFriend: false,
      visiblePendingRequest: false,
      removeUser: null,
      visibleConfirmDelete: false,
    };
  }

  onPendingRequest = () => {
    this.setState({ visibleAddFriend: false }, () => {
      setTimeout(() => {
        this.setState({ visiblePendingRequest: true });
      }, 500);
    });
  };

  onSearch = () => {
    this.props.navigation.navigate(SCREENS.SEARCH);
  };

  onDeleteChat = (userId, userName) => {
    let data = new FormData();
    // console.log(userId, userName); return;
    if (userId === undefined && userName === undefined) {
      data.append("username", userName);
      data.append("user_target_id", 0);
    } else {
      data.append("username", userName);
      data.append("user_target_id", userId);
    }
    let url = `${API_ENDPOINTS.REMOVE_FRIEND}`;

    API.request({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data,
    }).then((res) => {
      this.props.requestChannels(this.props.token);
    });
    this.setState({visibleConfirmDelete: false, removeUser: null});
  }

  render() {
    const { reportUser, visibleReport, visibleAddFriend, visiblePendingRequest, visibleConfirmDelete, removeUser } = this.state;
    return (
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.header}>
              <Touchable onPress={this.onSearch} style={styles.searchFieldContainer}>
                <View style={styles.searchIconContainer}>
                  <Image
                    source={require("@assets/images/search.png")}
                    style={styles.searchIcon}
                  />
                </View>
                <Text style={styles.searchText}>{"Search"}</Text>
              </Touchable>

              <View style={styles.newChatIconContainer}>
                <Touchable onPress={() => this.setState({ visibleAddFriend: true })}>
                  <Image
                    source={require("@assets/images/new-chat.png")}
                    style={styles.plusIcon}
                  />
                  <PendingRequestCountView />
                </Touchable>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <NewFriends
                navigation={this.props.navigation}
              />
              <View
                style={[
                  styles.separator,
                  styles.marginTopZero,
                ]}
              />
              <Messages
                navigation={this.props.navigation}
                onPressItem={(chatId, chatUser) => {
                  this.props.navigation.navigate(SCREENS.CHAT, { chatId, chatUser });
                }}
                onReport={(user) => this.setState({reportUser: user, visibleReport: true})}
                onRemove={(user) => this.setState({removeUser: user, visibleConfirmDelete: true})}
              />
            </View>
          </View>
        </SafeAreaView>

        <AddFriendModal
          isVisible={visibleAddFriend}
          dismissModal={() => this.setState({ visibleAddFriend: false })}
          pendingRequest={() => this.onPendingRequest()}
          navigation={this.props.navigation}
        />

        <PendingRequestModal
          isVisible={visiblePendingRequest}
          dismissModal={() => this.setState({ visiblePendingRequest: false })}
        />
        
        <ReportModal
          isVisible={visibleReport && reportUser !== null}
          userId={reportUser ? (reportUser.id || reportUser._id) : null}
          onDismiss={() => this.setState({ visibleReport: false })}
        />

        <NotificationModal
          isVisible={visibleConfirmDelete && removeUser !== null}
          userId={removeUser ? (removeUser.id || removeUser._id) : null}
          userName={removeUser ? (removeUser.name || removeUser.username) : null}
          onBack={() => this.setState({visibleConfirmDelete: false})}
          onConfirm={(userId, userName) => this.onDeleteChat(userId, userName)}
        />
      </Screen>
    );
  }
}

export default Inbox;
