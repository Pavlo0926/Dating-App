import React, { useEffect, useState, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Image, Touchable, Text } from "@components";
import moment from "moment";
import styles from "./action-buttons-view.style";

const ActionButtonsView: () => React$Node = props => {
  const [enableSuperLike, setEnableSuperLike] = useState(true);
  const [boosting, setBoosting] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  const boostInterval = useRef(null);
  const animations = useRef(null);

  const [_opacity1] = useState(new Animated.Value(0));
  const [_moveY1] = useState(new Animated.Value(0));
  const [_opacity2] = useState(new Animated.Value(0));
  const [_moveY2] = useState(new Animated.Value(0));

  useEffect(() => {
    if (animations !== null && animations.current !== null) {
      animations.current.reset();
    }
    animations.current = Animated.loop(
      Animated.sequence([
        Animated.timing(_opacity1, {
          duration: 100,
          toValue: 1,
          useNativeDriver: false
        }),
        Animated.parallel([
          Animated.timing(_opacity1, {
            duration: 500,
            toValue: 0,
            useNativeDriver: false
          }),
          Animated.timing(_moveY1, {
            duration: 500,
            toValue: 1,
            useNativeDriver: false
          }),
        ]),
        Animated.timing(_opacity2, {
          duration: 100,
          toValue: 1,
          useNativeDriver: false
        }),
        Animated.parallel([
          Animated.timing(_opacity2, {
            duration: 500,
            toValue: 0,
            useNativeDriver: false
          }),
          Animated.timing(_moveY2, {
            duration: 500,
            toValue: 1,
            useNativeDriver: false
          }),
        ]),
      ])
    );
    if (boosting) {
      animations.current.start();
    }
  }, [boosting]);

  useEffect(() => {
    let boostTime = props.user.advanced.last_boost_time.end_boost_swipe_time;
    if (boostTime) {
      let duration = moment.unix(boostTime).diff(moment(), "seconds");
      if (duration > 0) {
        setBoosting(true);
        let restSeconds = duration;
        boostInterval.current = setInterval(() => {
          if (restSeconds < 0) {
            clearInterval(boostInterval.current);
            setBoosting(false);
          } else {
            restSeconds -= 1;
            setRemainTime(restSeconds);
          }
        }, 1000);
      } else {
        setBoosting(false);
      }
    }
    return () => {
      clearInterval(boostInterval.current);
    }
  }, [props.user.advanced.last_boost_time.end_boost_swipe_time]);

  return (
    <View style={styles.bottomActions} pointerEvents={"box-none"}>
      <SafeAreaView>
        <View style={styles.bottomContainer} pointerEvents={"box-none"}>
          <View style={[styles.buttonRow]} pointerEvents={"box-none"}>
            <Touchable onPress={() => props.onReload()}
              disabled={!props.isRewinds}>
              <Image
                style={[styles.buttonSmall, !props.isRewinds ? {opacity: 0.5} : {}]}
                source={require("@assets/images/swipe-screen/swipe-refresh.png")}
              />
            </Touchable>
            <Touchable onPress={() => props.onRocket(boosting)}
              disabled={props.isBoosting}>
              {!boosting &&
              <Image
                style={styles.buttonSmall}
                source={require("@assets/images/swipe-screen/swipe-rocket.png")}
              />}
              {boosting &&
              <View style={styles.boostButtonContainer}>
                <Text style={styles.boostText}>
                  {(props.user.advanced.last_boost_time.count_swipe * 10 - remainTime * (props.user.advanced.last_boost_time.count_swipe * 10 - 1) / (600 * props.user.advanced.last_boost_time.count_swipe)).toFixed(1)}x
                </Text>
                <Animated.Image
                  style={[styles.boostRocketView1, 
                    {
                      opacity: _opacity1,
                      transform: [{translateY: _moveY1.interpolate({inputRange: [0, 1], outputRange: [0, -50]})}]
                    }
                  ]}
                  source={require("@assets/images/swipe-screen/swipe-boost-rocket.png")}
                />
                <Animated.Image
                  style={[styles.boostRocketView2, 
                    {
                      opacity: _opacity2,
                      transform: [{translateY: _moveY2.interpolate({inputRange: [0, 1], outputRange: [0, -50]})}]
                    }
                  ]}
                  source={require("@assets/images/swipe-screen/swipe-boost-rocket.png")}
                />
              </View>}
            </Touchable>
          </View>
          <View
            style={[styles.buttonRow, styles.buttonRowMargin]}
            pointerEvents={"box-none"}
          >
            <Touchable onPress={() => props.onDisLike()}>
              <Image
                source={require("@assets/images/swipe-screen/swipe-cross.png")}
                style={styles.buttonNormal}
              />
            </Touchable>
            <Touchable
              onPress={() => {
                props.onSuperLike();
                setEnableSuperLike(false);
                setTimeout(() => {
                  setEnableSuperLike(true);
                }, 800);
              }}
              disabled={!enableSuperLike || props.isSuperLiking}>
              <Image
                source={require("@assets/images/swipe-screen/swipe-star.png")}
                style={[styles.buttonSmall, !enableSuperLike ? {opacity: 0.5} : {}]}
              />
            </Touchable>
            <Touchable onPress={() => props.onLike()}>
              <Image
                source={require("@assets/images/swipe-screen/swipe-heart.png")}
                style={styles.buttonNormal}
              />
            </Touchable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ActionButtonsView;
