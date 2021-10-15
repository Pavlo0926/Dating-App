import React, { useEffect, useState } from "react";
import { View, Animated, PanResponder } from "react-native";
import { HomeStack } from "../../navigation/home-navigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EventBus from "eventing-bus";
import { BoxShadow, BannerAlert, GestureRecognizer, Touchable, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { StreamStatus, SCREENS, TUTORIAL } from "@constants";
import LiveStream from "../live-stream";
import StreamStopModal from "./stream-stop-modal";

import styles, { width, height } from "./home.style";
import PushNotification from "./push-notification";
import AsyncStorage from "@react-native-community/async-storage";

const shadowOptions = {
  width: 130,
  height: 200,
  color: "#0B0516",
  opacity: 1,
  _borderRadius: 22,
  spread: 0,
  blur: 10,
  offsetX: 0,
  offsetY: 6,
};

const Home = props => {
  const insets = useSafeAreaInsets();
  const { setStreamStatus, updateMessages, initLiveUsers, updateChannelName } = props;
  const [visibleStream, setVisibleStream] = useState(false);
  const [isBroadcaster, setBroadcaster] = useState(false);
  const [streamParams, setStreamParams] = useState({
    channelName: null,
    isBroadcaster: false,
    isJoin: false,
  });
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState(3);
  const [originalPos, setOriginalPos] = useState({ x: 0, y: 0 });
  const [visibleStop, setVisibleStop] = useState(false);
  const [tutorialMode, setTutorialMode] = useState(false);

  const maxDeltaY = height - (insets.bottom + insets.top + 100);
  const positionStyle = [
    { left: 10, top: insets.top + 60 },
    { right: 10, top: insets.top + 60 },
    { left: 10, bottom: insets.bottom + 60 },
    { right: 10, bottom: insets.bottom + 60 },
  ];
  const tutorialStyle = [
    { left: 10, top: insets.top + 20 },
    { right: 10, top: insets.top + 20 },
    { left: 10, bottom: insets.bottom + 260 },
    { right: 10, bottom: insets.bottom + 260 },
  ];
  const windowPositions = [
    { x: 10, y: insets.top + 60 },
    { x: width - 140, y: insets.top + 60 },
    { x: 10, y: height - (insets.bottom + 260) },
    { x: width - 140, y: height - (insets.bottom + 260) },
  ];

  var _panXY = new Animated.ValueXY({ x: 0, y: 0 });
  var _scaleX = new Animated.Value(0);
  var _scaleY = new Animated.Value(0);
  var _opacity = new Animated.Value(1);
  var _tutorialOpacity = new Animated.Value(1);
  const scaleXInterpolate = _scaleX.interpolate({
    inputRange: [0, width],
    outputRange: [1, 130 / width],
    extrapolate: "clamp",
  });
  const scaleYInterpolate = _scaleY.interpolate({
    inputRange: [0, height],
    outputRange: [1, 200 / height],
    extrapolate: "clamp",
  });

  const isLeaveArea = gestureState => {
    const { dx, dy } = gestureState;
    let centerY = originalPos.y + 100 + dy;
    let centerX = originalPos.x + 65 + dx;

    if (centerY < insets.top + 20 || centerY > height - insets.bottom - 20) {
      return true;
    }
    if (centerX < 35 || centerX > width - 35) {
      return true;
    }
    return false;
  };

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      if (minimized) return true;
      if (props.isScrolling) return false;
      return (
        props.streamStatus !== StreamStatus.PREPARING &&
        e.nativeEvent.pageY < height / 2 - 50
      );
    },
    onPanResponderMove: (e, gestureState) => {
      if (minimized) {
        Animated.event(
          [
            null,
            {
              dx: _panXY.x,
              dy: _panXY.y,
            },
          ],
          { useNativeDriver: false },
        )(e, gestureState);
        Animated.timing(_tutorialOpacity, {
          toValue: 0,
          duration: 50,
          useNativeDriver: false
        }).start();
        if (isLeaveArea(gestureState)) {
          Animated.timing(_opacity, {
            toValue: 0.5,
            duration: 50,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(_opacity, {
            toValue: 1,
            duration: 50,
            useNativeDriver: false,
          }).start();
        }
      } else {
        if (gestureState.dy > 0) {
          Animated.timing(_panXY, {
            toValue: { x: 0, y: gestureState.dy / 3 },
            duration: 100,
            useNativeDriver: false,
          }).start();
        }
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (!minimized) {
        if (gestureState.vy > 1 || gestureState.dy > maxDeltaY - 30) {
          minimizedView();
        } else {
          Animated.parallel([
            Animated.timing(_panXY, {
              toValue: { x: 0, y: 0 },
              duration: 100,
              useNativeDriver: false,
            }),
          ]).start();
        }
      } else {
        if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
          setMinimized(false);
        } else {
          if (isLeaveArea(gestureState)) {
            Animated.timing(_opacity, {
              toValue: 0,
              duration: 50,
              useNativeDriver: false,
            }).start(() => {
              if (isBroadcaster) {
                setVisibleStop(true);
              } else {
                onLeaveRoom();
              }
            });
          } else {
            updateViewPosition(gestureState);
            Animated.timing(_tutorialOpacity, {
              toValue: 1,
              duration: 50,
              useNativeDriver: false
            }).start();
          }
        }
      }
    },
  });

  const minimizedView = () => {
    let animPos =
      originalPos.x === 0
        ? {
            x: width - 140 - width / 2 + 65,
            y: height - 260 - insets.bottom - height / 2 + 100,
          }
        : { x: originalPos.x - width / 2 + 65, y: originalPos.y - height / 2 + 100 };
    Animated.parallel([
      Animated.timing(_scaleX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(_scaleY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(_panXY, {
        toValue: animPos,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMinimized(true);
    });
  };

  const updateViewPosition = gestureState => {
    const { dx, dy } = gestureState;
    let centerX = originalPos.x + dx + 65;
    let centerY = originalPos.y + dy + 100;
    let newPosition = 0;
    if (centerX >= width / 2) {
      if (centerY >= height / 2) {
        newPosition = 3;
      } else {
        newPosition = 1;
      }
    } else {
      if (centerY >= height / 2) {
        newPosition = 2;
      } else {
        newPosition = 0;
      }
    }
    let newX = windowPositions[newPosition].x - windowPositions[position].x;
    let newY = windowPositions[newPosition].y - windowPositions[position].y;
    Animated.timing(_panXY, {
      toValue: { x: newX, y: newY },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      if (position !== newPosition) {
        _panXY.setValue({ x: 0, y: 0 });
        setPosition(newPosition);
      }
    });
  };

  const onLeaveRoom = () => {
    setVisibleStream(false);
    setStreamStatus(StreamStatus.NONE);
    updateChannelName(null);
  };

  const onHideNotification = () => {
    props.updateNotification(null);
  };

  const onJoinLive = (stream) => {
    if (props.streamStatus !== StreamStatus.NONE) {
      if (streamParams.channelName === stream.channel) {
        return;
      }
      EventBus.publish("APP_END_STREAM_ACTION");
      setTimeout(() => {
        let params = {
          channelName: stream.channel,
          isBroadcaster: false,
          isJoin: true,
        };
        EventBus.publish("NEW_STREAM_ACTION", params);
      }, 500);
    } else {
      let params = {
        channelName: stream.channel,
        isBroadcaster: false,
        isJoin: true,
      };
      EventBus.publish("NEW_STREAM_ACTION", params);
    }
  }

  useEffect(() => {
    setStreamStatus(StreamStatus.NONE);
    const newStreamAction = EventBus.on("NEW_STREAM_ACTION", params => {
      initLiveUsers({ broadcasters: [], audience: [] });
      setStreamParams(params);
      setMinimized(false);
      let systemMsg = {
        id: "1",
        message: "Please make sure you follow the community guidelines. No bullying, hate speech, nudity or violence.\nPlease report any users violating the rules.",
        type: "system",
      };
      updateMessages([systemMsg]);
      if (params.isJoin) {
        setStreamStatus(StreamStatus.JOINED);
        setBroadcaster(false);
      } else {
        setStreamStatus(StreamStatus.PREPARING);
        setBroadcaster(true);
      }
      updateChannelName(params.channelName);
      setVisibleStream(true);
    });
    const endStreamAction = EventBus.on("APP_END_STREAM_ACTION", () => {
      setVisibleStream(false);
      setStreamStatus(StreamStatus.NONE);
      updateChannelName(null);
    });
    return () => {
      newStreamAction();
      endStreamAction();
    };
  }, [initLiveUsers, setStreamStatus, updateMessages, updateChannelName]);

  useEffect(() => {
    AsyncStorage.getItem(TUTORIAL.MINIMIZED, (error, result) => {
      if (result === null || result === "0") {
        setTutorialMode(true);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <HomeStack navigation={props.navigation} />
      {visibleStream && streamParams.channelName !== null && minimized && tutorialMode && 
      <Animated.View 
        style={[styles.tutorialContainer, tutorialStyle[position], 
          {opacity: _tutorialOpacity, transform: [{ translateX: _panXY.x }, { translateY: _panXY.y }]}]}>
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.tutorialView}>
          <Text style={styles.tutorialText}>Swipe away to close</Text>
        </LinearGradient>
      </Animated.View>}
      {visibleStream && streamParams.channelName !== null ? (
        <Animated.View
          style={[
            styles.absoluteView,
            minimized ? styles.minimizedView : styles.fullView,
            minimized ? positionStyle[position] : {},
            {
              opacity: _opacity,
              transform: [
                { translateX: _panXY.x },
                { translateY: _panXY.y },
                { scaleX: scaleXInterpolate },
                { scaleY: scaleYInterpolate },
              ],
            },
          ]}
          {..._panResponder.panHandlers}
          onLayout={e => {
            if (minimized) {
              setOriginalPos({ x: e.nativeEvent.layout.x, y: e.nativeEvent.layout.y });
            }
          }}
        >          
          {minimized && <BoxShadow setting={shadowOptions} />}
          <View style={[styles.floatingContainer, minimized ? styles.border : {}]}>
            <LiveStream
              navigation={props.navigation}
              streamParams={streamParams}
              minimized={minimized}
              onMinimized={minimizedView}
              onLeaveRoom={() => onLeaveRoom()}
              onChangedRole={(value) => setBroadcaster(value)}
            />
          </View>
        </Animated.View>
      ) : null}
      {props.notification !== null && (
        <GestureRecognizer
          style={styles.alertContainer}
          enableMoveUp={true}
          maxMoveUp={100}
          onSwipeUp={state => onHideNotification()}
          config={{directionalOffsetThreshold: 10}}
        >
          <Touchable onPress={() => {
            if (props.notification.type === "livestream" || props.notification.type === "livefriend") {
              props.notification.stream && onJoinLive(props.notification.stream);
            } else if (props.notification.type === "chat") {
              props.navigation.navigate(SCREENS.CHAT, { 
                chatId: props.notification.chatId, chatUser: props.notification.user });
            } else if (props.notification.type === "friend-match") {
              props.navigation.navigate(SCREENS.CHAT, { chatUser: props.notification.user });
            }
            onHideNotification();
          }}>
            <BannerAlert
              notification={props.notification}
              hideNotification={onHideNotification}
              onAcceptFriend={userId => {
                props.acceptFriendRequest(userId, props.token);
                setTimeout(() => {
                  props.loadPendingRequests(props.token);
                }, 500);
                onHideNotification();
              }}
              onRejectFriend={userId => {
                props.rejectFriendRequest(userId, props.token);
                setTimeout(() => {
                  props.loadPendingRequests(props.token);
                }, 500);
                onHideNotification();
              }}
              onAcceptLive={stream => {
                onJoinLive(stream);
                onHideNotification();
              }}
              onRejectLive={() => {
                onHideNotification();
              }}
            />
          </Touchable>
        </GestureRecognizer>
      )}

      <StreamStopModal
        isVisible={visibleStop}
        onBack={() => {
          Animated.timing(_opacity, {
            toValue: 1,
            duration: 50,
            useNativeDriver: false,
          }).start(() => {
            setVisibleStop(false);
          });
          Animated.timing(_tutorialOpacity, {
            toValue: 1,
            duration: 50,
            useNativeDriver: false,
          }).start();
        }}
        onLeaveRoom={() => {
          setVisibleStop(false);
          onLeaveRoom();
          if (tutorialMode) {
            setTutorialMode(false);
            AsyncStorage.setItem(TUTORIAL.MINIMIZED, "1");
          }
        }}
      />
      <PushNotification />
    </View>
  );
};

Home.router = HomeStack.router;

export default Home;
