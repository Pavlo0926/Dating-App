import React, { Component } from "react";
import { View, PermissionsAndroid, Platform, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import EventBus from "eventing-bus";
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  VideoFrameRate,
  DegradationPreference,
  UserOfflineReason,
  RtcLocalView,
  RtcRemoteView,
  VideoRemoteState,
  VideoRenderMode,
} from "react-native-agora";
import { Screen, Text, Touchable, NotificationModal } from "@components";
import { RTCENGINE } from "@config";
import { StreamSetting } from "@constants";
import { widthPercentageToDP as wp } from "@helpers";
import Images from "@assets/Images";

import StreamSpeakerView from "../stream-speaker-view";
import StreamJoinModal from "../stream-join-modal";
import styles from "./stream-player.style";

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("You can use the cameras & mic");
    } else {
      console.log("Permission denied");
    }
  } catch (err) {
    console.log(err);
  }
};

class StreamPlayer extends Component {
  constructor(props) {
    super(props);
    const { streamParams } = this.props;
    const { channelName } = streamParams;
    this.state = {
      appId: RTCENGINE.appId,
      channelName: channelName,
      joinSucceed: false,
      streamerIds: [],
      visibleJoin: false,
      askedUser: null,
      askedByUser: false,
      visibleNotification: false,
      notificationData: {
        text: "Are you sure",
        logoBackground: "#ABA7D5",
        logoTintColor: "black",
        buttonColors: ["#ABA7D5", "#ABA7D5"],
        buttonText: "Okay",
        buttonTextStyle: "#0B0516",
      }
    };
    this._engine = null;
    this.users = 0;

    if (Platform.OS === "android") {
      requestCameraAndAudioPermission().then(() => {
        console.log("requested!");
      });
    }

    this.props.resetEnabledSettings();
  }

  componentDidMount() {
    this.initRtcEngine();
    this.streamStoppedAction = EventBus.on("StreamStopped", channelName => {
      if (this.state.channelName === channelName) {
        this.props.onEndedStream();
      }
    });
    this.streamJoinAction = EventBus.on("Stream_join_user", jsonData => {
      if (jsonData === undefined) return;
      const { streamParams, audiences } = this.props;
      let data = JSON.parse(jsonData);
      if (streamParams.channelName === data.stream) {
        let users = audiences.filter(audience => audience._id === data.user._id);
        if (users.length === 0) {
          let newAudiences = [data.user, ...audiences];
          this.props.updateAudiences(newAudiences);
        }

        if (data.user._id === this.props.user.id) {
          this.props.updateStreamInfo(data.stream_info.boost_end_time, parseInt(data.stream_info.invite_only, 10));
        }
      }
    });
    this.streamLeaveAction = EventBus.on("Stream_disconnect_user", jsonData => {
      if (jsonData === undefined) return;
      const { streamParams, audiences } = this.props;
      let data = JSON.parse(jsonData);
      if (streamParams.channelName === data.stream) {
        this.props.updateAskedUsers(this.props.askedUsers.filter((value) => value._id !== data.user._id));
        let newAudiences = audiences.filter(audience => audience._id !== data.user._id);
        this.props.updateAudiences(newAudiences);
        this.props.updateMutedUsers(this.props.mutedUsers.filter((value) => value !== data.user._id));
        this.props.updateRemoteMutedUsers(this.props.remoteMutedUsers.filter((value) => value !== data.user._id));
      }
    });
    this.streamAskToJoin = EventBus.on("Stream_ask_join", jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (data.stream !== this.state.channelName) return;
      if (data.user._id === this.props.user.id) {
        this.setState({ askedByUser: false, askedUser: data.host, visibleJoin: true });
      }
    });
    this.streamRefusedJoin = EventBus.on("Stream_refused_join", jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (data.stream !== this.state.channelName) return;
      if (this.props.isBroadcaster) {
        const { audiences } = this.props;
        let newAudiences = [];
        audiences.forEach((audience, index) => {
          if (audience._id === data.user._id) {
            audience.sendRequest = false;
          }
          newAudiences.push(audience);
        });
        this.props.updateAudiences(newAudiences);
      }
    });
    this.streamSwitchUser = EventBus.on(
      "Stream_broadcast_disconnect_by_host",
      jsonData => {
        if (jsonData === undefined) return;
        let data = JSON.parse(jsonData);
        if (data.user._id === this.props.user.id) {
          this._engine.setClientRole(ClientRole.Audience);
          this.props.setAskedToJoin(false);
          this.props.onChangeRole(false);
          this.props.resetEnabledSettings();
          // this._engine.disableVideo();
        }
      },
    );
    this.userAskJoin = EventBus.on("Stream_user_ask_join", jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (data.host._id === this.props.user.id) {
        // this.setState({ askedByUser: true, askedUser: data.user, visibleJoin: true });
        console.log(data.user._id);
        this.props.updateAskedUsers([data.user._id, ...this.props.askedUsers]);
      }
    });
    this.userAcceptJoin = EventBus.on("Stream_user_accept_join", async jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (data.user._id === this.props.user.id) {
        this._engine.setClientRole(ClientRole.Broadcaster);
        this.props.setAskedToJoin(false);
        this.props.onChangeRole(true);
        await this._engine.enableVideo();
      }
    });
    this.userRefusedJoin = EventBus.on("Stream_user_refused_join", jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (data.user._id === this.props.user.id) {
        this.props.setAskedToJoin(false);
      }
    });
    this.unsubscribeUpdateBadges = EventBus.on("Update_badges", jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      const { audiences, broadcasters } = this.props;
      for (let index = 0; index < audiences.length; index++) {
        if (audiences[index]._id === data.user) {
          audiences[index].badges = data.badges;
          break;
        }
      }
      for (let index = 0; index < broadcasters.length; index++) {
        if (broadcasters[index]._id === data.user) {
          broadcasters[index].badges = data.badges;
          break;
        }
      }
      this.props.updateAudiences(audiences);
      this.props.updateBroadcasters(broadcasters);
    });

    this.remoteMuteAction = EventBus.on("REMOTE_USER_MUTE", data => {
      this._engine.muteRemoteAudioStream(data.userId, data.mute);
      if (data.mute === true) {
        this.props.updateRemoteMutedUsers([data.userId, ...this.props.remoteMutedUsers]);
      } else {
        this.props.updateRemoteMutedUsers(this.props.remoteMutedUsers.filter((value) => value !== data.userId));
      }
    });
    this.streamUserKickAction = EventBus.on("Stream_user_kick", async (jsonData) => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (parseInt(data.user, 10) === this.props.user.id) {
        this.onLeaveRoom();
        this.setState({notificationData: {
          text: "You've been kicked from this live",
          logoBackground: "#312446",
          logoTintColor: "white",
          buttonColors: ["#312446", "#312446"],
          buttonText: "Okay",
          buttonTextStyle: "white",
        }, visibleNotification: true});
      }
    });
    this.streamUserBanAction = EventBus.on("Stream_user_ban", jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (parseInt(data.user, 10) === this.props.user.id) {
        this.onLeaveRoom();
        this.setState({notificationData: {
          text: "You've been banned from this live",
          logoBackground: "#FF0036",
          logoTintColor: "black",
          buttonColors: ["#FF0036", "#FF0036"],
          buttonText: "Okay",
          buttonTextStyle: "black",
        }, visibleNotification: true});
      }
    });

    this.switchCameraAction = EventBus.on(StreamSetting.SWITCH_CAMERA, () => {
      this._engine.switchCamera();
    });
    this.updateUsersAction = EventBus.on("User_update", data => {
      const { broadcasters, audiences } = this.props;
      let filteredUsers = broadcasters.filter(
        broadcaster => broadcaster._id === data.user._id,
      );
      if (filteredUsers.length > 0) {
        this.updateChannelInformation();
      } else {
        filteredUsers = audiences.filter(audience => audience._id === data.user._id);
        if (filteredUsers.length > 0) {
          this.updateChannelInformation();
        }
      }
    });
  }

  async componentWillUnmount() {
    this.streamStoppedAction();
    this.streamJoinAction();
    this.streamLeaveAction();
    this.streamAskToJoin();
    this.streamRefusedJoin();
    this.remoteMuteAction();
    this.streamUserKickAction();
    this.streamUserBanAction();
    this.userAskJoin();
    this.userAcceptJoin();
    this.userRefusedJoin();
    this.switchCameraAction();
    this.streamSwitchUser();
    this.updateUsersAction();

    this.onLeaveRoom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this._engine !== null &&
      prevProps.isEnabledCamera !== this.props.isEnabledCamera
    ) {
      this._engine.muteLocalVideoStream(!this.props.isEnabledCamera);
      if (this.props.isEnabledCamera === false) {
        this.removeStreamer(this.props.user.id);
      } else {
        this.addStreamer(this.props.user.id);
      }
    }

    if (this._engine !== null && prevProps.isEnabledMic !== this.props.isEnabledMic) {
      this._engine.muteLocalAudioStream(!this.props.isEnabledMic);
      if (!this.props.isEnabledMic) {
        this.props.updateMutedUsers([...this.props.mutedUsers, this.props.user.id]);
      } else {
        this.props.updateMutedUsers(this.props.mutedUsers.filter(id => id !== this.props.user.id));
      }
    }
  }

  initRtcEngine = async () => {
    const { appId, channelName } = this.state;
    this._engine = await RtcEngine.create(appId);
    this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);

    if (this.props.isBroadcaster) {
      this._engine.setClientRole(ClientRole.Broadcaster);
    } else {
      this._engine.setClientRole(ClientRole.Audience);
    }
    this._engine
      .setVideoEncoderConfiguration({
        frameRate: VideoFrameRate.Fps60,
        minFrameRate: VideoFrameRate.Fps30,
        degradationPrefer: DegradationPreference.MaintainQuality,
      })
      .catch(e => {
        console.log(e);
      });
    await this._engine.enableVideo();
    this.addRtcListeners();
    this._engine.joinChannel(null, channelName, null, this.props.user.id);
  };

  onLeaveRoom = async () => {
    if (this._engine !== null) {
      await this._engine.leaveChannel();
      this._engine.destroy();
      this._engine = null;

      let names = this.state.channelName.split("-");
      if (names.length > 1) {
        if (parseInt(this.props.user.id, 10) === parseInt(names[1], 10)) {
          let params = { channel_id: this.props.streamParams.channelName };
          this.props.streamStop(params, this.props.token);
        }
      }
      this.props.streamLeave(this.props.streamParams.channelName, this.props.token);
    }
  }

  addRtcListeners = () => {
    this._engine.enableAudioVolumeIndication(200, 3, true);
    this._engine.addListener("UserJoined", (uid, elapsed) => {
      const { broadcasters, audiences } = this.props;
      let tmpUsers = audiences.filter(audience => audience._id === uid);
      if (tmpUsers.length > 0) {
        // adding broadcaster
        this.props.updateAudiences(audiences.filter(audience => audience._id !== uid));
        this.props.updateBroadcasters([tmpUsers[0], ...broadcasters]);
      }
    });
    this._engine.addListener("UserOffline", (uid, reason) => {
      const { broadcasters, audiences } = this.props;
      let tmpUsers = broadcasters.filter(broadcaster => broadcaster._id === uid);
      if (tmpUsers.length > 0) {
        if (reason === UserOfflineReason.BecomeAudience) {
          tmpUsers[0].sendRequest = false;
          this.props.updateAudiences([...audiences, tmpUsers[0]]);
        }
        this.props.updateBroadcasters(
          broadcasters.filter(broadcaster => broadcaster._id !== uid),
        );
        this.props.updateMutedUsers(this.props.mutedUsers.filter((value) => value !== uid));
        this.props.updateRemoteMutedUsers(this.props.remoteMutedUsers.filter((value) => value !== uid));
      }
    });

    this._engine.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
      if (this.props.isBroadcaster) {
        this.addStreamer(uid);
      } else {
        this.props.streamJoin(this.props.streamParams.channelName, this.props.token);
      }
      this.updateChannelInformation();
      this.setState({
        joinSucceed: true,
      });
    });

    this._engine.addListener("ClientRoleChanged", (oldRole, newRole) => {
      let uid = this.props.user.id;
      if (this.state.joinSucceed) {
        this.props.streamUserType(
          this.state.channelName,
          uid,
          newRole === ClientRole.Broadcaster ? 1 : 0,
          this.props.token,
        );
      }
      if (oldRole !== newRole) {
        if (newRole === ClientRole.Broadcaster) {
          this.addStreamer(uid);
          const { broadcasters, audiences } = this.props;
          let tmpUsers = audiences.filter(audience => audience._id === uid);
          if (tmpUsers.length > 0) {
            this.props.updateAudiences(
              audiences.filter(audience => audience._id !== uid),
            );
            this.props.updateBroadcasters([...broadcasters, tmpUsers[0]]);
          }
        } else {
          this.removeStreamer(uid);
          const { broadcasters, audiences } = this.props;
          let tmpUsers = broadcasters.filter(broadcaster => broadcaster._id === uid);
          if (tmpUsers.length > 0) {
            tmpUsers[0].sendRequest = false;
            this.props.updateAudiences([...audiences, tmpUsers[0]]);
            this.props.updateBroadcasters(
              broadcasters.filter(broadcaster => broadcaster._id !== uid),
            );
          }
        }
      }
    });

    this._engine.addListener("RemoteVideoStateChanged", (uid, state, reason, elapsed) => {
      if (state === VideoRemoteState.Decoding) {
        this.addStreamer(uid);
      } else if (state === VideoRemoteState.Stopped) {
        this.removeStreamer(uid);
      }
    });

    this._engine.addListener("UserMuteAudio", (uid, muted) => {
      if (muted) {
        this.props.updateMutedUsers([...this.props.mutedUsers, uid]);
      } else {
        this.props.updateMutedUsers(this.props.mutedUsers.filter(id => id !== uid));
      }
    });

    this._engine.addListener("AudioVolumeIndication", (speakers, total) => {
      EventBus.publish("NEW_SPEAKERS", speakers);
    });
  };

  addStreamer = uid => {
    const { streamerIds } = this.state;
    if (streamerIds.indexOf(uid) === -1) {
      this.setState(
        {
          streamerIds: [...streamerIds, uid],
        },
        () => {
          this.props.onChangeStreamers(this.state.streamerIds.length);
        },
      );
    }
  };

  removeStreamer = uid => {
    const { streamerIds } = this.state;
    if (streamerIds.indexOf(uid) !== -1) {
      this.setState(
        {
          streamerIds: streamerIds.filter(id => id !== uid),
        },
        () => {
          this.props.onChangeStreamers(this.state.streamerIds.length);
        },
      );
    }
  };

  updateChannelInformation = () => {
    const { channelName } = this.state;
    this.props.streamUserList(channelName, this.props.token);
  };

  renderNoVideos = () => {
    return (
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.noVideosContainer}>
          {this.props.broadcasters.map((broadcaster, index) => {
            return (
              <Touchable
                key={`no-videos-streamer-${index}`}
                disabled={this.props.minimized}
                style={[
                  styles.userContainer,
                  { marginTop: this.props.minimized ? wp(10) : wp(35) },
                ]}
                onPress={() => {
                  this.props.onShowProfile(broadcaster);
                }}
              >
                <View style={styles.imageContainer}>
                  <StreamSpeakerView
                    broadcaster={broadcaster}
                    imageStyle={styles.image}
                    large={true}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{broadcaster.first_name}</Text>
                  <LinearGradient
                    style={styles.overlayView}
                    colors={["rgba(49, 36, 70, 0)", "rgba(49, 36, 70, 1)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
              </Touchable>
            );
          })}
        </View>
      </SafeAreaView>
    );
  };

  renderVideoView = uid => {
    const { channelName } = this.state;
    if (this.props.user.id === uid) {
      return (
        <RtcLocalView.SurfaceView
          style={[styles.flexFill]}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
          zOrderMediaOverlay={false}
        />
      );
    } else {
      return (
        <RtcRemoteView.SurfaceView
          style={styles.flexFill}
          uid={uid}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
          zOrderMediaOverlay={true}
        />
      );
    }
  };

  renderAllView = (streamUsers, isOdd) => {
    let startIndex = isOdd ? 1 : 0;
    let userCount = streamUsers.length;
    var videoViews = [];
    for (let i = startIndex; i < userCount; i += 2) {
      videoViews.push(
        <View
          key={`video-player-${i}`}
          style={userCount === 2 ? styles.flexColumn : styles.flexRow}
        >
          {this.renderVideoView(streamUsers[i])}
          {i + 1 < userCount && this.renderVideoView(streamUsers[i + 1])}
        </View>
      );
    }
    return videoViews;
  };

  render() {
    const { streamerIds } = this.state;
    const viewCounts = streamerIds.length;
    const isOdd = viewCounts % 2 !== 0;

    return (
      <View style={[styles.container, this.props.style]}>
        {isOdd && this.renderVideoView(streamerIds[0])}
        {this.renderAllView(streamerIds, isOdd)}
        {viewCounts === 0 && (
          <Screen hasGradient style={[styles.flexFill, styles.absolute]}>
            {this.renderNoVideos()}
          </Screen>
        )}

        {this.state.askedUser !== null && (
          <StreamJoinModal
            isVisible={this.state.visibleJoin}
            askedByUser={this.state.askedByUser}
            askedUser={this.state.askedUser}
            onBack={() => {
              if (this.state.askedByUser) {
                this.props.userRefusedJoin(
                  this.state.channelName,
                  this.state.askedUser._id,
                  this.props.token,
                );
              } else {
                this.props.streamRefusedJoin(
                  this.state.channelName,
                  this.props.user.id,
                  this.props.token,
                );
              }
              this.setState({ visibleJoin: false, askedUser: null });
            }}
            onJoin={() => {
              const { channelName, askedUser } = this.state;
              if (this.state.askedByUser) {
                this.props.userAcceptJoin(channelName, askedUser._id, this.props.token);
              } else {
                this.props.streamAcceptJoin(channelName, askedUser._id, this.props.token);
                this.props.setAskedToJoin(false);
                this.props.onChangeRole(true);
                this._engine.setClientRole(ClientRole.Broadcaster);
                this._engine.enableVideo();
              }
              this.setState({ visibleJoin: false, askedUser: null });
            }}
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
          onBack={() => {}}
          onConfirm={(a, b) => this.setState({visibleNotification: false}, () => {
            this.props.onLeaveRoom && this.props.onLeaveRoom();
          })} />
      </View>
    );
  }
}

export default StreamPlayer;
