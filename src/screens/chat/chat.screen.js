import React from "react";
import { Platform, View, Keyboard, ActivityIndicator, FlatList, Linking } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import { Screen, Touchable, Text, Image, ConfirmModal, NotificationModal } from "@components";
import { SCREENS } from "@constants";
import { GiftedChat, SystemMessage } from "react-native-gifted-chat";
import KeyboardManager from "react-native-keyboard-manager";
import EventBus from "eventing-bus";
import moment from "moment";
import Header from "./header";
import MessageBubble from "./message-bubble";
import Avatar from "./avatar";
import InputToolbar from "./input-toolbar";
import ReportModal from "../report-modal";
import { widthPercentageToDP as wp, Notification } from "@helpers";
import EmptyView from "./empty-view";
import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";
import LinearGradient from "react-native-linear-gradient";
import ZoomImageModal from "./zoom-image-modal";
import UserSettingModal from "./user-setting-modal";
import Images from "../../assets/Images";

import styles from "./chat.style";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: null,
      msgText: "",
      visibleReport: false,
      visibleZoomImage: false,
      visibleUserSetting: false,
      visibleConfirmBlock: false,
      visibleConfirmDelete: false,
      zoomImage: null,
      lastSeenTime: this.props.chatUser === 0 ? null : this.props.chatUser.last_activity,
      isOnline: false,
      openedChat: false,
      sentSystemAlert: false,
    };
    this.ActionSheet = React.createRef();``
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setKeyboardDistanceFromTextField(0);
      KeyboardManager.setEnable(false);
      KeyboardManager.setShouldResignOnTouchOutside(false);
    }

    this.checkingOnlineStatus();

    this.chatIdAction = EventBus.on("NEW_CHAT_ID", chatId => {
      this.setState({ chatId });
    });

    this.friendRemoveAction = EventBus.on("Need_Close_Chat", () => {
      this.props.navigation.goBack();
    })

    this.lastSeenAction = EventBus.on("Last_seen", (jsonData) => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      if (chatUser !== 0 && data.user === parseInt((chatUser.id || chatUser._id), 10)) {
        this.setState({lastSeenTime: parseInt(data.time, 10)});
        this.props.updateMessagesState();
      }
    });

    this.openChatAction = EventBus.on("Open_chat", (jsonData) => {console.log("Open_chat");
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      if (chatUser !== 0 && data.user === parseInt((chatUser.id || chatUser._id), 10)) {
        this.setState({openedChat: true});
        this.props.requestOpenChat(this.state.chatId, this.props.token);
        this.props.updateMessagesState();
      }
    });

    this.closeChatAction = EventBus.on("Close_chat", (jsonData) => {
      let data = JSON.parse(jsonData);console.log("Close_chat");
      const { chatUser } = this.props;

      if (chatUser !== 0 && data.user === parseInt((chatUser.id || chatUser._id), 10)) {
        this.setState({openedChat: false});
      }
    });

    this.onlineAction = EventBus.on("User_online", (jsonData) => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      let chatUserId = parseInt((chatUser.id || chatUser._id), 10);
      let onlineUsers = data.user.filter((value) => value.id === chatUserId);

      if (chatUser !== 0 && onlineUsers.length > 0) {
        this.setState({isOnline: true});
      }
    });

    this.offlineAction = EventBus.on("User_offline", (jsonData) => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      let chatUserId = parseInt((chatUser.id || chatUser._id), 10);
      let offlineUsers = data.user.filter((value) => value.id === chatUserId);

      if (chatUser !== 0 && offlineUsers.length > 0) {
        this.setState({isOnline: false, lastSeenTime: offlineUsers[0].last_activity});
      }
    });

    this.newMessageAction = EventBus.on("NEW_MSG", data => {
      const { messages, token, user, chatUser } = this.props;
      let arrData = JSON.parse(data);

      // checking chat_id
      if (this.state.chatId === null) {
        if (arrData[0].user === 0) {
          if (chatUser !== 0) return;
        } else {
          if (parseInt(arrData[0].user._id, 10) !== parseInt((chatUser.id || chatUser._id), 10)) {
            return;
          }
        }
        this.setState({chatId: arrData[0].chat_id});
        this.checkingOnlineStatus();
      } else {
        if (parseInt(arrData[0].chat_id, 10) !== parseInt(this.state.chatId, 10)) {
          return;
        }
      }
      
      if (arrData[0].user === 0) {
        arrData[0].user = {
          _id: 0,
          name: "Pluzo Team",
          images: [{ path: require("@assets/images/app-icon.png") }],
        };
      }
      if (parseInt(arrData[0].user._id, 10) === parseInt(user.id, 10)) {
        return;
      }

      let newMessages = [];
      newMessages.push({
        _id: arrData[0].id,
        text: arrData[0].text,
        image: arrData[0].image,
        createdAt: moment.unix(arrData[0].created_at).toDate(),
        user: {
          _id: arrData[0].user._id,
          name: arrData[0].user.name || arrData[0].user.username,
          avatar: arrData[0].user.images[0].path,
        },
      });
      this.props.updateMessages(newMessages.concat(messages));
      if (arrData[0].user._id !== user.id) {
        this.props.readMessage([arrData[0].id], token);
      }
    });

    const { token, chatUser, chatId } = this.props;
    if (chatUser === 0) {
      this.props.requestMessages(chatId, chatUser, token);
    } else {
      this.props.requestMessages(chatId, chatUser.id || chatUser._id, token);
    }
    this.props.readFlag(chatUser === 0 ? 0 : (chatUser.id || chatUser._id), token);
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(100);
      KeyboardManager.setEnableAutoToolbar(false);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
    this.chatIdAction();
    this.lastSeenAction();
    this.onlineAction();
    this.offlineAction();
    this.openChatAction();
    this.closeChatAction();
    this.newMessageAction();
    this.friendRemoveAction();

    this.props.requestCloseChat(this.state.chatId, this.props.token);
  }

  checkingOnlineStatus = () => {
    const { chatUser } = this.props;
    if (chatUser === 0) return;
    let params = new FormData();
    params.append("user_id", (chatUser.id || chatUser._id));
    API.request({
      method: "post",
      url: `${API_ENDPOINTS.CHECK_USER_STATUS}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data: params,
    }).then(response => {
      let data = response.data.data;
      if (data.online === 1) {
        this.setState({isOnline: true});
      }
      // if (this.state.lastSeenTime === null) {
      //   this.setState({lastSeenTime: data.last_activity});
      // }
    }).catch(e => {
      console.log(e);
    });
  }

  onAddAttachment = () => {
    const { messages, chatUser } = this.props;
    let mymsgs = messages.filter(
      value =>
        !value.system &&
        parseInt(value.user._id, 10) === parseInt(this.props.user.id, 10),
    );
    let opponentId = chatUser === 0 ? chatUser : chatUser.id || chatUser._id;
    let otherMsgs = messages.filter(
      value => !value.system && parseInt(value.user._id, 10) === parseInt(opponentId, 10),
    );
    if (mymsgs.length === 0 || otherMsgs.length === 0) {
      if (this.state.sentSystemAlert === false) {
        this.props.updateMessages(
          [
            {
              _id: moment().millisecond(),
              text: "You can't send photos till you both message each other first",
              createdAt: new Date(),
              system: true,
            },
          ].concat(this.props.messages),
        );
        this.setState({sentSystemAlert: true});
      }
      return;
    }

    Keyboard.dismiss();

    this.ActionSheet.show();
  };

  onSelectImage = index => {
    const options = {
      width: 500,
      height: 395,
      compressImageQuality: 0.7,
      cropping: false,
      smartAlbums: ['PhotoStream', 'Generic', 'Panoramas', 'Videos', 'Favorites', 'Timelapses', 'AllHidden', 'RecentlyAdded', 'Bursts', 'SlomoVideos', 'UserLibrary', 'SelfPortraits', 'Screenshots', 'DepthEffect', 'LivePhotos', 'Animated', 'LongExposure'],
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

    this.props.updateMessages(
      [
        {
          _id: moment().unix(),
          text: this.state.msgText,
          image: data.path,
          createdAt: new Date(),
          user: {
            _id: this.props.user.id,
            name: this.props.user.name || this.props.user.username,
            avatar: this.props.user.images[0].path,
          },
          message_info: {
            sent: 1,
            received: this.state.openedChat ? 1 : 0,
          }
        },
      ].concat(this.props.messages),
    );

    const { chatUser } = this.props;
    const params = {
      chatId: this.state.chatId,
      text: this.state.msgText,
      image: image,
      sendTo: chatUser === 0 ? chatUser : chatUser.id || chatUser._id,
    };
    const { token } = this.props;
    this.props.sendMessage(params, token);
    this.setState({ msgText: "" });
  };

  onSend = (messages = []) => {
    if (messages[0].text === "") return;
    messages[0].message_info = {sent: 1,received: this.state.openedChat ? 1 : 0,}
    this.props.updateMessages([messages[0]].concat(this.props.messages));

    const { chatUser } = this.props;
    const params = {
      chatId: this.state.chatId,
      text: messages[0].text,
      image: null,
      sendTo: chatUser === 0 ? chatUser : chatUser.id || chatUser._id,
    };
    const { token } = this.props;
    this.props.sendMessage(params, token);
  };

  onDeleteFriend = () => {
    const { chatUser } = this.props;

    let data = new FormData();
    data.append("username", chatUser.username);
    data.append("user_target_id", (chatUser.id || chatUser._id));
    let url = `${API_ENDPOINTS.REMOVE_FRIEND}`;

    API.request({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data,
    });
    this.setState({visibleConfirmDelete: false});
  }

  renderNotification = () => {
    if (Platform.OS === "ios" && this.props.pushEnabled === false) {
      return (
        <Touchable style={styles.notifyContainer}
          onPress={() => {
            Notification.confirmAlert("Get notified?", `Would you like to know when ${this.props.chatUser.first_name} answer your message?`,
              "Open Settings", "Not now", () => {
                Linking.openURL('app-settings:');
              });
          }}>
          <LinearGradient
            colors={["#02FFF3", "#617FFF"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.notifySubContainer}>
            <Image source={Images.app.icNotify} style={styles.notifyIcon} />
            <View>
              <Text style={styles.notifyTitle}>{`See when ${this.props.chatUser.first_name} replies.`}</Text>
              <Text style={styles.notifySubText}>{"Enable push notifications."}</Text>
            </View>
          </LinearGradient>
        </Touchable>
      )
    }
    return null;
  }

  renderFooterView = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={["Hello!", "Hey!", "Hey, how are you?", "Hi :)"]}
        contentContainerStyle={styles.firstMessagesContentContainer}
        keyExtractor={(item, index) => `first-${index}`}
        renderItem={({item: item, index}) => {
          return (
            <Touchable
              onPress={() => {
                this.onSend([{
                  _id: moment().unix(),
                  text: item,
                  image: null,
                  createdAt: new Date(),
                  user: {
                    _id: this.props.user.id,
                    name: this.props.user.name || this.props.user.username,
                    avatar: this.props.user.images[0].path,
                  },
                }]);
              }}
              style={styles.firstMessage}>
              <Text style={styles.firstMessageText}>{item}</Text>
            </Touchable>
          )
        }}>
      </FlatList>
    )
  }

  render() {
    const { chatUser, loading, messages } = this.props;
    let isFirstMsg = messages.filter((message) => !message.system && (message.user._id || message.user.id) === this.props.user.id).length === 0;
    return (
      <Screen hasHeader style={styles.container}>
        <Header
          user={chatUser}
          onBack={() => this.props.navigation.goBack()}
          onProfileView={() => {
            if (chatUser === 0) return;
            this.props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: chatUser });
          }}
          onReport={() => this.setState({ visibleUserSetting: true })}
          lastSeenTime={this.state.lastSeenTime}
          isOnline={this.state.isOnline}
        />
        <View style={styles.body}>
          {loading ? (
            <ActivityIndicator
              size={"large"}
              color={"white"}
              style={styles.loadingIndicator}
            />
          ) : (
            <GiftedChat
              listViewProps={{ keyboardDismissMode: "on-drag" }}
              messages={messages}
              text={this.state.msgText}
              isKeyboardInternallyHandled={true}
              bottomOffset={this.props.insets.bottom}
              // minComposerHeight={22.5}
              minInputToolbarHeight={Platform.OS === "ios" ? wp(57) : wp(50)}
              alwaysShowSend={true}
              containerStyle={{
                right: { marginBottom: 0 }
              }}
              renderBubble={bubbleProps => (
                <MessageBubble
                  {...bubbleProps}
                  onLongPress={this._onOpenActionSheet}
                  onPress={this._openAttachment}
                  onFullImage={image => {
                    this.setState({ zoomImage: image, visibleZoomImage: true });
                  }}
                />
              )}
              renderAvatar={avatarProps => {
                return <Avatar {...avatarProps} onPress={() => {
                  this.props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: chatUser });
                }} />;
              }}
              renderInputToolbar={props => {
                this.onSendNew = props.onSend;
                return <InputToolbar {...props} onAttachment={this.onAddAttachment}
                  onSendMessage={() => {
                    props.onSend({ text: this.state.msgText }, true);
                  }} />;
              }}
              renderTime={props => {
                return <View />;
              }}
              renderSystemMessage={props => {
                return <SystemMessage {...props} containerStyle={styles.systemMessage} />;
              }}
              renderChatEmpty={() => {
                return <EmptyView user={chatUser} navigation={this.props.navigation} />;
              }}
              renderFooter={() => {
                if (isFirstMsg === false || chatUser === 0) {
                  return null;
                }
                return this.renderFooterView();
              }}
              user={{
                _id: this.props.user.id,
              }}
              onSend={msgs => this.onSend(msgs)}
              onInputTextChanged={msgText => this.setState({ msgText: msgText })}
            />
          )}
          {this.renderNotification()}
        </View>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Select Image"}
          options={["Take Photo...", "Choose from Library...", "Cancel"]}
          cancelButtonIndex={2}
          onPress={index => this.onSelectImage(index)}
        />
        <UserSettingModal
          isVisible={this.state.visibleUserSetting}
          user={chatUser}
          onDismiss={() => this.setState({ visibleUserSetting: false })}
          onReport={() => {
            setTimeout(() => {
              this.setState({visibleReport: true});
            }, 400);
          }}
          onBlock={() => {
            setTimeout(() => {
              this.setState({visibleConfirmBlock: true});
            }, 400);
          }}
          onUnfriend={() => {
            setTimeout(() => {
              this.setState({visibleConfirmDelete: true});
            }, 400);
          }}
        />
        <ReportModal
          isVisible={this.state.visibleReport}
          keyboardDisable={true}
          userId={(chatUser.id || chatUser._id)}
          onDismiss={() => this.setState({ visibleReport: false })}
        />
        <ConfirmModal 
          isVisible={this.state.visibleConfirmBlock}
          user={chatUser}
          onDismiss={() => this.setState({ visibleConfirmBlock: false })}
          onConfirm={() => {
            this.props.blockUser((chatUser.id || chatUser._id), this.props.token);
            this.setState({ visibleConfirmBlock: false }, () => {
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 1000);
            });
          }}/>
        <NotificationModal
          isVisible={this.state.visibleConfirmDelete}
          onBack={() => this.setState({visibleConfirmDelete: false})}
          onConfirm={(userId, userName) => {
            this.setState({visibleConfirmDelete: false});
            this.onDeleteFriend();
          }}
        />
        <ZoomImageModal
          isVisible={this.state.visibleZoomImage}
          zoomImage={this.state.zoomImage}
          onSwipeComplete={() => this.setState({ visibleZoomImage: false })}
        />
      </Screen>
    );
  }
}

export default Chat;
