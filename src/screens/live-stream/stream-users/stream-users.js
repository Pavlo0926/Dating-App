import React, { Component } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  TextInput as RNTextInput,
} from "react-native";
import {
  Image,
  Touchable,
  Text,
  SolidButton,
  Screen,
  IconButton,
  BoxShadow,
  GestureRecognizer,
  NotificationModal
} from "@components";
import EventBus from "eventing-bus";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import { Switch } from "react-native-switch";
import { SwipeRow } from "react-native-swipe-list-view";
import { Notification, widthPercentageToDP as wp } from "@helpers";
import { GRADIENT, AppBadges, AppTags } from "@config";
import { TUTORIAL } from "@constants";
import Images from "@assets/Images";

import styles from "./stream-users.style";
import StreamUserIcon from "../stream-user-icon";
import StreamCategoryModal from "../stream-category-modal";

class StreamUsers extends Component {
  constructor(props) {
    super(props);
    const { streamParams } = this.props;
    let names = streamParams.channelName.split("-");
    let creator = 0;
    if (names.length > 1) {
      creator = parseInt(names[1], 10);
    }
    this.state = {
      creator,
      tutorialTop: -100,
      tutorialPadding: 0,
      visibleTutorial: false,
      visibleCategories: false,
      visibleNotification: false,
      notificationData: {
        text: "Are you sure",
        logoBackground: "#ABA7D5",
        logoTintColor: "black",
        buttonColors: ["#ABA7D5", "#ABA7D5"],
        buttonText: "Okay",
        buttonTextStyle: "#0B0516",
      },
      streamName: this.props.stream === null ? "" : this.props.stream.name,
      inviteOnly:
        this.props.stream === null || this.props.stream.invite_only === null
          ? false
          : parseInt(this.props.stream.invite_only, 10) === 0
          ? false
          : true,
    };

    this.slideAnim = new Animated.Value(250);
    this.swipeRefs = [];
    this.openedIndex = null;
  }

  componentDidMount() {
    Animated.timing(this.slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      AsyncStorage.getItem(TUTORIAL.KICK_BAN2, (err, result) => {
        if (result === null || result === "0") {
          if (this.props.stream && this.props.stream.user._id === this.props.user.id) {
            this.setState({visibleTutorial: true});
          }
        }
      });
    });
  }

  componentWillUnmount() {
    this.props.setIsScrolling(false);
    if (this.props.isBroadcaster === true) {
      this.props.updateStream(this.props.stream, this.props.token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stream === null && this.props.stream !== null) {
      this.onUpdateStates();
    }
  }

  onUpdateStates = () => {
    this.setState({ streamName: this.props.stream.name });
    this.setState({
      inviteOnly:
        this.props.stream.invite_only === null
          ? false
          : parseInt(this.props.stream.invite_only, 10) === 0
          ? false
          : true,
    });
  };

  onRemoveBroadcaster = broadcaster => {
    const { streamParams } = this.props;
    if (broadcaster._id === this.state.creator) {
      if (this.props.user.id !== broadcaster._id) {
        Notification.alert("The creator cannot disconnect");
        return;
      }
    }
    this.props.requestStreamDisconnectBroad(
      streamParams.channelName,
      broadcaster._id,
      this.props.token,
    );
  };

  onAddToBroadcaster = audience => {
    const { streamParams } = this.props;
    this.props.requestStreamAskJoin(
      streamParams.channelName,
      audience._id,
      this.props.token,
    );
    const { audiences } = this.props;
    let newAudiences = [];
    audiences.forEach((user, index) => {
      if (user._id === audience._id) {
        user.sendRequest = true;
      }
      newAudiences.push(user);
    });
    this.props.updateAudiences(newAudiences);
  };

  isSendRequest = user => {
    return !(user.sendRequest === undefined || user.sendRequest === false);
  };

  onChangeTitle = text => {
    this.setState({ streamName: text });
    let stream = this.props.stream;
    stream.name = text;
    this.props.streamUpdateSuccess(stream);
  };

  onChangeTitleUpdate = () => {
    this.props.updateStream(this.props.stream, this.props.token);
  };

  onInviteOnlyChanged = val => {
    this.setState({ inviteOnly: val });
    let stream = this.props.stream;
    stream.invite_only = val ? "1" : "0";
    this.props.updateStream(stream, this.props.token);
  };

  onMute = (index, user, isMuted) => {
    this.swipeRefs[index].closeRow();
    let userID = parseInt(user._id, 10);
    this.setState({notificationData: {
      text: `Are you sure you want to ${isMuted ? "unmute" : "mute"} ${user.first_name}`,
      logoBackground: "#312446",
      logoTintColor: "white",
      buttonColors: ["#312446", "#312446"],
      buttonText: "Okay",
      buttonTextStyle: "white",
      type: isMuted ? "unmute" : "mute",
      userId: userID,
    }, visibleNotification: true});
  };

  onKick = (index, user) => {
    this.swipeRefs[index].closeRow();
    this.setState({notificationData: {
      text: `Are you sure you want to kick ${user.first_name}`,
      logoBackground: "#312446",
      logoTintColor: "white",
      buttonColors: ["#312446", "#312446"],
      buttonText: "Okay",
      buttonTextStyle: "white",
      type: "kick",
      userId: user._id,
      userName: user.first_name,
    }, visibleNotification: true});
  };

  onBan = (index, user) => {
    this.swipeRefs[index].closeRow();
    this.setState({notificationData: {
      text: `Are you sure you want to ban ${user.first_name}`,
      logoBackground: "#FF0036",
      logoTintColor: "#0B0516",
      buttonColors: ["#FF0036", "#FF0036"],
      buttonText: "Okay",
      buttonTextStyle: "#0B0516",
      type: "ban",
      userId: user._id,
      userName: user.first_name,
    }, visibleNotification: true});
  };

  onSendSystemMsg = (msg) => {
    let newMessage = {
      id: `${moment().unix()}.${moment().millisecond()}`,
      user: this.props.user,
      message: msg,
      type: "system",
    };
    this.props.updateMessages([newMessage].concat(this.props.messages));
    this.props.requestChatAdd(this.props.stream.channel, msg, 2, this.props.token);
  };

  renderBroadCasterRow = (index, user, isBroadcaster, isStreamer) => {
    let isOwner = false;
    if (this.props.stream) {
      isOwner = this.props.stream.user._id === user._id;
    }
    let userID = parseInt(user._id, 10);
    let isMuted = false;
    if (this.props.remoteMutedUsers.filter((value) => value === userID).length > 0) {
      isMuted = true;
    }

    return (
      <SwipeRow
        ref={ref => this.swipeRefs[index] = ref}
        disableRightSwipe
        disableLeftSwipe={this.props.stream === null || isOwner}
        rightOpenValue={-wp(180)}
        stopRightSwipe={-wp(180)}
        closeOnRowPress={true}
        onRowOpen={(value) => {
          if (this.openedIndex !== null) {
            this.swipeRefs[this.openedIndex].closeRow();
          }
          this.openedIndex = index;
          if (this.state.visibleTutorial === true) {
            this.setState({visibleTutorial: false});
            AsyncStorage.setItem(TUTORIAL.KICK_BAN2, "1");
          }
        }}
        onRowClose={() => {
          if (index === this.openedIndex) {
            this.openedIndex = null;
          }
        }}>
        <GestureRecognizer style={styles.transparentContainer}
          onSwipeRight={() => this.swipeRefs[index].closeRow()}>
          <Touchable style={styles.transparentButton}
            onPress={() => this.onMute(index, user)}/>
          <Touchable style={styles.transparentButton}
            onPress={() => this.onKick(index, user)}/>
          <Touchable style={styles.transparentButton}
            onPress={() => this.onBan(index, user)}/>
        </GestureRecognizer>
        <View style={styles.swipeItemContainer}>
          <View style={styles.flexFill}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{user.first_name}</Text>
              {user.badges.map(badge => {
                if (badge > AppBadges.length) return null;
                return (
                  <Image
                    key={`profile-badge-${badge}`}
                    style={styles.badgeImage}
                    source={Images.badges[AppBadges[badge-1].id]}
                  />
                );
              })}
            </View>
            <Text style={styles.usernameText}>
              {user.name || user.username}
            </Text>
          </View>
          {isBroadcaster && this.state.creator !== user._id && isStreamer === true && (
            <Touchable onPress={() => this.onRemoveBroadcaster(user)}>
              <Image source={Images.live.broadcasterRemove} style={styles.streamRemoveIcon} />
            </Touchable>
          )}
          {isBroadcaster && isStreamer === false && (
            <Touchable
              disabled={this.isSendRequest(user)}
              onPress={() => {
                if (this.props.askedUsers.filter((value) => value === user._id).length > 0) {
                  this.props.userAcceptJoin(this.props.streamParams.channelName, user._id, this.props.token);
                  this.props.updateAskedUsers(this.props.askedUsers.filter((value) => value !== user._id));
                } else {
                  this.onAddToBroadcaster(user);
                }
              }}
            >
              {!this.isSendRequest(user) ? (
                this.props.askedUsers.filter((value) => value === user._id).length > 0 ? (
                  <View style={styles.streamAskedContainer}>
                    <Image source={Images.live.icHand} style={styles.streamAskedIcon}  />
                  </View>
                ) : (
                  <Image source={Images.live.broadcasterAdd} style={styles.streamRemoveIcon}  />
                )
              ) : (
                <Image source={Images.live.broadcasterWait} style={styles.streamRemoveIcon}  />
              )}
            </Touchable>
          )}
          <View style={styles.kickBanContainer}>
            <Touchable style={styles.muteButton}
              onPress={() => this.onMute(index, user, isMuted)}>
              <Text style={styles.muteButtonText}>{isMuted ? "Unmute" : "Mute"}</Text>
            </Touchable>
            <Touchable style={styles.kickButton}
              onPress={() => this.onKick(index, user)}>
              <Text style={styles.muteButtonText}>Kick</Text>
            </Touchable>
            <Touchable style={styles.banButton}
              onPress={() => this.onBan(index, user)}>
              <Text style={styles.banButtonText}>Ban</Text>
            </Touchable>
          </View>
        </View>
      </SwipeRow>
    )
  }

  render() {
    const { broadcasters, audiences, isBroadcaster, stream } = this.props;

    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateX: this.slideAnim }] }]}
        pointerEvents={"box-none"}
      >
        <Screen
          hasGradient
          style={[
            styles.safeAreaContainer,
            {
              paddingTop: this.props.insets.top,
              paddingBottom: this.props.insets.bottom,
            },
          ]}
        >
          <SafeAreaView style={styles.flexFill}>
            <View style={styles.header}>
              <Touchable
                style={styles.headerButtonTouchable}
                onPress={this.props.onReport}
              >
                <Image source={require("@assets/images/report.png")} />
              </Touchable>
              {isBroadcaster && stream !== null ? (
                <Touchable
                  onPress={() => {
                    this.setState({ visibleCategories: true });
                  }}
                  style={[styles.emojiButton]}
                >
                  {/* <Image source={Images.live[AppTags[stream.category].icon]} /> */}
                  <View style={[styles.itemColorView, { backgroundColor: AppTags[stream.category].color}]} />
                </Touchable>
              ) : (
                <View style={styles.headerTitleContainer}>
                  <Text style={styles.headerTitle}>{"Live"}</Text>
                  <View style={styles.onlineIconContainer}>
                    <LinearGradient
                      colors={GRADIENT.FRIEND_ONLINE_ICON}
                      from={{ x: 0, y: 0 }}
                      to={{ x: 1, y: 0 }}
                      style={styles.onlineIcon}
                    />
                  </View>
                </View>
              )}
            </View>

            {isBroadcaster && stream !== null && (
              <RNTextInput
                value={this.state.streamName}
                style={styles.streamTitle}
                placeholder={"Set a title"}
                placeholderTextColor={"#E8E6FF"}
                onChangeText={text => this.onChangeTitle(text)}
                onEndEditing={() => this.onChangeTitleUpdate()}
                autoCorrect={false}
                allowFontScaling={false}
              />
            )}

            {isBroadcaster && stream !== null && (
              <View style={styles.inviteOnlyContainer}>
                <View>
                  <Text style={styles.inviteOnlyText}>Invite-Only</Text>
                  <Text style={styles.inviteOnlySubtext}>
                    Only people you invite can join
                  </Text>
                </View>
                <Switch
                  value={this.state.inviteOnly}
                  onValueChange={val => this.onInviteOnlyChanged(val)}
                  circleSize={20}
                  barHeight={24}
                  circleBorderWidth={0}
                  backgroundActive={"#617FFF"}
                  backgroundInactive={"#ABA7D5"}
                  circleActiveColor={"white"}
                  circleInActiveColor={"white"}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchBorderRadius={12}
                  switchWidthMultiplier={2.2}
                />
              </View>
            )}
            {isBroadcaster && <View style={styles.separator} />}

            <View style={styles.inviteButtonContainer}>
              <SolidButton
                text={"+ Invite friends"}
                onPress={this.props.onInviteFriends}
              />
            </View>

            <ScrollView style={styles.scrollView} onLayout={(e) => this.setState({tutorialTop: e.nativeEvent.layout.y})}>
              {/** stream users */}
              <View style={styles.flexRow}>
                <View style={styles.streamerMark} />
                <Text
                  style={styles.streamerText}
                >{`${broadcasters.length} Streamer`}</Text>
              </View>
              {broadcasters.map((user, index) => {
                return (
                  <View key={"stream" + index} style={styles.userContainer}
                    onLayout={(e) => {
                      if (index === 0) {
                        this.setState({tutorialPadding: e.nativeEvent.layout.y});
                      }
                    }}>
                    <StreamUserIcon
                      user={user}
                      onImagePress={() => this.props.onShowProfile(user)}
                    />
                    <View style={styles.broadcasterContainer}>
                      {this.renderBroadCasterRow(index, user, isBroadcaster, true)}
                    </View>                    
                  </View>
                );
              })}

              {/** viewers */}
              <View style={styles.flexRow}>
                <Image source={Images.live.icEye} />
                <Text style={styles.streamerText}>{`${audiences.length} Viewer`}</Text>
              </View>
              {this.props.askedUsers.length > 0 &&
              <View><View style={styles.askedContainer}>
                <Text style={styles.askedUserText}>{`${this.props.askedUsers.length} people wants to stream`}</Text>
              </View></View>}
              {audiences.map((user, index) => {
                return (
                  <View key={"viewer" + user.id} style={styles.userContainer}>
                    <StreamUserIcon
                      isStreamer={false}
                      user={user}
                      onImagePress={() => this.props.onShowProfile(user)}
                    />
                    <View style={styles.broadcasterContainer}>
                      {this.renderBroadCasterRow(broadcasters.length + index, user, isBroadcaster, false)}
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {this.props.inviteOnly === 0 &&
            <View style={styles.boostContainer}>
              <BoxShadow
                setting={{
                  width: wp(60),
                  height: wp(60),
                  color: "#6E00FF",
                  opacity: 0.6,
                  _borderRadius: wp(30),
                  spread: 0,
                  blur: 10,
                  offsetX: 0,
                  offsetY: 0,
                }}
              />
              <IconButton
                backColor={"#D491FF"}
                icon={Images.app.icRocket}
                iconWidth={27}
                iconHeight={27}
                onPress={this.props.onBoost}
                disabled={this.props.isBoosting}
              />
            </View>}
          </SafeAreaView>

          {stream !== null && (
            <StreamCategoryModal
              isVisible={this.state.visibleCategories}
              onDismiss={() => this.setState({ visibleCategories: false })}
            />
          )}

          <NotificationModal 
            isVisible={this.state.visibleNotification}
            title={this.state.notificationData.text}
            message={""}
            logoIcon={Images.app.icInfo}
            logoTintColor={this.state.notificationData.logoTintColor}
            logoBackground={this.state.notificationData.logoBackground}
            buttonColors={this.state.notificationData.buttonColors}
            buttonText={this.state.notificationData.buttonText}
            buttonTextStyle={this.state.notificationData.buttonTextStyle}
            buttonContainerStyle={{marginTop: 32}}
            onBack={() => this.setState({visibleNotification: false})}
            onConfirm={(a, b) => this.setState({visibleNotification: false}, () => {
              let userID = this.state.notificationData.userId;
              if (this.state.notificationData.type === "kick") {
                this.props.requestStreamKickUser(userID, this.props.stream.channel, this.props.token);
                this.onSendSystemMsg(`${this.state.notificationData.userName} kicked out.`);
              } else if (this.state.notificationData.type === "ban") {
                this.props.requestStreamBanUser(userID, this.props.stream.channel, this.props.token);
                this.onSendSystemMsg(`${this.state.notificationData.userName} banned.`);
              } else {
                if (this.state.notificationData.type === "unmute") {
                  EventBus.publish("REMOTE_USER_MUTE", {userId: userID, mute: false});
                } else {
                  EventBus.publish("REMOTE_USER_MUTE", {userId: userID, mute: true});
                }
              }
            })} 
          />
        </Screen>
        {this.state.visibleTutorial && broadcasters.length > 1 &&
        <View style={[
          styles.tutorialContainer,
          {
            top: this.state.tutorialTop 
                + this.state.tutorialPadding 
                + this.props.insets.top 
                + ((parseInt(broadcasters[0]._id, 10) === this.props.user.id) ? wp(70) : wp(10)),
          }
        ]}>
          <Text style={styles.tutorialText}>Swipe left to mute/kick/ban</Text>
          <Image source={Images.app.icRight} style={styles.tutorialIcon} />
        </View>}
      </Animated.View>
    );
  }
}

export default StreamUsers;
