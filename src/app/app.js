import React from "react";
import { StatusBar, Platform, AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import KeyboardManager from "react-native-keyboard-manager";
import AsyncStorage from "@react-native-community/async-storage";
import FastImage from "react-native-fast-image";
import EventBus from "eventing-bus";
import OneSignal from "react-native-onesignal";
import { connect } from "react-redux";
import { AppContainer } from "../screens";
import Loading from "../screens/loading";
import { WS } from "@components";
import { NavigationService, IapManager } from "@helpers";
import { SCREENS, TUTORIAL } from "@constants";
import { COLOR } from "@config";
import { UserCreators, InboxCreators, LiveCreators } from "@redux/actions";
import { userOnline } from "@redux/api";

if (Platform.OS === "ios") {
  KeyboardManager.setEnable(true);
  KeyboardManager.setKeyboardDistanceFromTextField(100);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setShouldResignOnTouchOutside(true);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoading: true,
      appState: AppState.currentState,
    };
  }

  async componentDidMount() {
    try {
      let userToken = await AsyncStorage.getItem("USER_TOKEN");
      SplashScreen.hide();
      if (userToken) {
        this.setState({ firstLoading: true });
        this.props.requestProfile(userToken);
      } else {
        setTimeout(() => {
          this.setState({ firstLoading: false });
        }, 2500);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading === true && this.props.loading === false) {
      if (this.state.firstLoading) {
        setTimeout(() => {
          this.setState({ firstLoading: false });
        }, 1500);
      }
    }
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background|unknown/) && nextAppState === "active") {
      OneSignal.getPermissionSubscriptionState((status) => {
        this.props.updatePushStatus(status.notificationsEnabled);
      });
      this.props.token && userOnline(null, this.props.token, "online").catch(e => console.log(e));
      // EventBus.publish("AppState_Active");
    } else if (this.state.appState.match(/inactive/) && nextAppState === "background") {
      this.props.token && userOnline(null, this.props.token, "offline").then(res => console.log("offline")).catch(e => console.log(e));
    }
    this.setState({ appState: nextAppState });
  };

  _onInitTutorials = () => {
    AsyncStorage.multiRemove([
      TUTORIAL.MINIMIZED,
      TUTORIAL.USERS,
      TUTORIAL.KICK_BAN1,
      TUTORIAL.KICK_BAN2,
      TUTORIAL.SWIPE,
      TUTORIAL.POINTER,
    ]);
  }

  isLogin = () => {
    const { user, token } = this.props;
    if (user !== null && token !== "" && token !== null) {
      if (user.status === 1) {
        return true;
      }
    }
    return false;
  };

  checkingLogin = async () => {
    const { user, token } = this.props;
    if (user !== null && token !== undefined && token !== "" && token !== null) {
      if (token === this.oldToken) return;
      if (user.status === 1) {
        if (NavigationService.isNavigator()) {
          AsyncStorage.setItem("USER_TOKEN", token);
          FastImage.preload([{ uri: user.images[0].path }]);
          NavigationService.navigate(SCREENS.HOMESTACK);
          userOnline(null, token, "online");
          if (user.first_login === 1) {
            this._onInitTutorials();
            const params = new FormData();
            params.append("first_login", 0);
            this.props.updateUser(params, this.props.token);

            this.props.updateNotification({
              type: "chat",
              message: "Welcome to Pluzo 🌟",
              user: 0,
              chatId: null,
            });
          }
          this.oldToken = token;
        }
      } else {
        NavigationService.navigate(SCREENS.SIGNUP_CODE_VERIFICATION, {
          phoneNumber: user.phone,
        });
      }
    } else {
      AsyncStorage.removeItem("USER_TOKEN");
      NavigationService.navigate(SCREENS.AUTHSTACK);
      this.oldToken = token;
    }
  };

  onMessage = ev => {
    let data = JSON.parse(ev.data);
    if (data.action === "User_update") {
      let objData = JSON.parse(data.data);
      if (parseInt(objData.user._id, 10) === this.props.user.id) {
        let newProfile = objData.user;
        newProfile.id = parseInt(newProfile._id, 10);
        this.props.updateProfile(newProfile);
        // console.log("user>>>", newProfile);
      }
      EventBus.publish("User_update", objData);
    } else if (data.action === "Friends") {
      //Friend_overlap
      if (this.props.user.id === data.user) {
        this.props.updateFriends(JSON.parse(data.data));
      }
    } else if (data.action === "Chat") {
      if (data.user === this.props.user.id) {
        EventBus.publish("NEW_MSG", data.data);
        let objData = JSON.parse(data.data);
        if (objData[0].type === "message" && parseInt(this.props.chatUserId, 10) !== objData[0].user._id) {
          this.props.updateNotification({
            type: "chat",
            message: objData[0].image !== null ? `${objData[0].user.first_name} sent an image` : objData[0].text,
            user: objData[0].user,
            chatId: objData[0].chat_id,
          });
        }
      }
    } else if (data.action === "Start_stream") {
      this.props.requestStreamList(this.props.token);
      let objData = JSON.parse(data.data);
      if (objData.friends.filter((value) => parseInt(value.id, 10) === this.props.user.id).length > 0) {
        this.props.updateNotification({
          type: "livefriend",
          stream: objData.stream,
          user: objData.host,
        });
      }
    } else if (data.action === "Stop_stream") {
      this.props.requestStreamList(this.props.token);
      EventBus.publish("StreamStopped", JSON.parse(data.data));
    } else if (data.action === "Stream_invite") {
      let objData = JSON.parse(data.data);
      if (data.user === this.props.user.id) {
        this.props.updateNotification({
          type: "livestream",
          stream: objData.stream,
          user: objData.host,
        });
      }
    } else if (data.action === "Friend_add") {
      let objData = JSON.parse(data.data);
      if (
        objData.user_target_id === this.props.user.id &&
        objData.friend_info.friend === 3
      ) {
        this.props.updateNotification({
          type: "friend",
          user: objData.host,
        });
        EventBus.publish(data.action);
        this.props.loadPendingRequests(this.props.token);
      }
    } else if (data.action === "Friend_remove") {
      let userData = JSON.parse(data.data);
      if (userData.host._id === this.props.user.id || 
        userData.user_target_id._id === this.props.user.id) {
        EventBus.publish("Need_Update_Friends");
        if (parseInt(this.props.chatUserId, 10) === parseInt(userData.host._id, 10) || 
          parseInt(this.props.chatUserId, 10) === parseInt(userData.user_target_id._id, 10)) {
          EventBus.publish("Need_Close_Chat");
        }
      }
    } else if (data.action === "Friend_overlap") {
      let userData = JSON.parse(data.data);
      if (userData.host._id === this.props.user.id || userData.user_target_id._id === this.props.user.id) {
        EventBus.publish("Need_Update_Friends");
        this.props.requestProfile(this.props.token);
        this.props.updateNotification({
          type: "friend-match",
          user: userData.host._id === this.props.user.id ? userData.user_target_id : userData.host,
        });
      }
    } else {
      EventBus.publish(data.action, data.data);
    }
  };

  render() {
    if (this.state.firstLoading) {
      return (
        <SafeAreaProvider>
          <StatusBar barStyle='light-content' backgroundColor={COLOR.HEADER_BACKGROUND} />
          <Loading />
        </SafeAreaProvider>
      );
    }

    return (
      <SafeAreaProvider>
        <StatusBar barStyle='light-content' backgroundColor={COLOR.HEADER_BACKGROUND} />
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
            this.checkingLogin();
          }}
        />
        {this.isLogin() && (
          <WS
            url={"ws://3.134.208.235:27800?user=" + this.props.user.id}
            onMessage={this.onMessage}
            onError={console.log}
            onClose={console.log}
            reconnect
          />
        )}
        {this.isLogin() && <IapManager />}
      </SafeAreaProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    loading: state.user.isLoadingProfile,
    chatUserId: state.chat.chatUserId,
  };
}

const mapDispatchToProps = {
  updatePushStatus: UserCreators.updatePushStatus,
  requestProfile: UserCreators.requestProfile,
  requestStreamList: LiveCreators.requestStreamList,
  updateNotification: UserCreators.updateNotification,
  updateProfile: UserCreators.updateUserSuccess,
  updateUser: UserCreators.requestUpdateUser,
  updateFriends: InboxCreators.requestFriendsSuccess,
  loadPendingRequests: InboxCreators.requestPendingFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
