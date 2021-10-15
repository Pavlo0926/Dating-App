import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { Screen, Text, Image, BoxShadow, GradientButton, AnimatedButton } from "@components";
import Modal from "react-native-modal";
import moment from "moment";
import Images from "@assets/Images";

import styles from "./boost-time-modal.style";

const BoostTimeModal: () => React$Node = props => {
  const boostInterval = useRef(null);
  const [restTime, setRestTime] = useState(null);
  const [boosting, setBoosting] = useState(true);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  let backShadowOpt = {
    width: width,
    height: height,
    color: "#0B0516",
    opacity: 0.5,
    _borderRadius: 20,
    spread: 0,
    blur: 20,
    offsetX: 0,
    offsetY: 6,
  };

  const {buttonDisable=false, ...rest } = props;

  if (props.isSwipe) {
    useEffect(() => {
      clearInterval(boostInterval.current);
      let boostTime = props.user.advanced.last_boost_time.end_boost_swipe_time;
      if (boostTime) {
        let duration = moment.unix(boostTime).diff(moment(), "seconds");
        if (duration > 0) {
          setBoosting(true);
          let restSeconds = duration;
          boostInterval.current = setInterval(() => {
            if (restSeconds < 2) {
              clearInterval(boostInterval.current);
              setBoosting(false);
              setRestTime(0);
            } else {
              restSeconds -= 1;
              setRestTime(restSeconds);
            }
          }, 1000);
        } else {
          setRestTime(0);
          setBoosting(false);
        }
      }
      return () => {
        clearInterval(boostInterval.current);
      }
    }, [props.user.advanced.last_boost_time.end_boost_swipe_time]);
  } else {
    useEffect(() => {
      clearInterval(boostInterval.current);
      let boostTime = props.boostEndTime;
      if (boostTime) {
        let duration = moment.unix(boostTime).diff(moment(), "seconds");
        if (duration > 0) {
          setBoosting(true);
          let restSeconds = duration;
          boostInterval.current = setInterval(() => {
            if (restSeconds < 2) {
              clearInterval(boostInterval.current);
              setBoosting(false);
              setRestTime(0);
            } else {
              restSeconds -= 1;
              setRestTime(restSeconds);
            }
          }, 1000);
        } else {
          setRestTime(0);
          setBoosting(false);
        }
      }
      return () => {
        clearInterval(boostInterval.current);
      }
    }, [props.inviteOnly, props.boostEndTime]);
  }
  

  const getRestTime = () => {
    let secs = restTime === null ? 0 : restTime;
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    if (hours < 1) {
      return `${minutes}:${seconds}`;
    } else {
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      return `${hours}:${minutes}:${seconds}`;
    }
  }

  return (
    <Modal
      {...rest}
      onBackdropPress={props.onBack}
      backdropOpacity={0.5}
      useNativeDriver={false}
      style={styles.modalContainer}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      swipeDirection={"down"}
      onSwipeComplete={props.onBack}
    >
      <View
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <BoxShadow setting={backShadowOpt} />
        <Screen hasGradient style={styles.modalContainer}>
          <Text style={styles.titleText}>
            {boosting ? props.isSwipe ? "You are at the top" : "Your live is at the top." : "Boost has ended"}
          </Text>
          <Text style={styles.messageText}>
            {props.isSwipe ? "Keep swiping for the best results." : "Get ready to entertain the crowd, people are joining."}
          </Text>
          <Text style={styles.remainTime}>{getRestTime()} remaining</Text>
          <View style={styles.buttonContainer}>
            <AnimatedButton
              text={"Boost now"}
              disabled={buttonDisable}
              onPress={() => props.onBoost(boosting)} />
          </View>
          <View style={[styles.closeButton]}>
            <GradientButton
              colors={["#312446", "#312446"]}
              noShadow
              text={"Close"}
              onPress={props.onBack}/>
          </View>
        </Screen>
        <View style={styles.logoContainer}>
          <Image source={Images.swipe.boostLogoCenter} style={styles.logoIcon} />
        </View>
      </View>
    </Modal>
  );
};

export default BoostTimeModal;
