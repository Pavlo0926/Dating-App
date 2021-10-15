import React, { useEffect } from "react";
import { View } from "react-native";
import { BoxShadow, Text, Touchable } from "@components";
import * as Animatable from "react-native-animatable";

import styles, { shadowOptions } from "./matches-view.style";
import FastImage from "react-native-fast-image";

const MatchesView: () => React$Node = props => {
  let matchImage =
    props.matchedUser === null
      ? require("@assets/images/live-screen/user-temp3.png")
      : { uri: props.matchedUser.images[0].path };

  const handleViewRef = ref => {
    this.view = ref;
  };

  useEffect(() => {
    this.view
      .animate({
        0: {
          opacity: 0,
          scale: 0,
        },
        0.5: {
          opacity: 0.5,
          scale: 0.5,
        },
        1: {
          opacity: 1,
          scale: 1,
        },
      })
      .then(() => {
        // setTimeout(() => {
        //   props.onHide && props.onHide();
        // }, 500);
      });
  }, []);

  return (
    <Animatable.View style={styles.container} ref={handleViewRef}>
      <Touchable style={styles.container} onPress={() => props.onHide()}>
        <View style={styles.flexRow}>
          <View>
            <BoxShadow setting={shadowOptions} />
            <FastImage
              source={{ uri: props.user.images[0].path }}
              style={styles.userImage}
            />
          </View>
          <View style={styles.rightImageContainer}>
            <BoxShadow setting={shadowOptions} />
            <FastImage source={matchImage} style={styles.userImage} />
          </View>
        </View>
        <FastImage
          source={require("@assets/images/heart1.png")}
          style={styles.heartImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.matchText}>New Friend!</Text>
      </Touchable>
    </Animatable.View>
  );
};

export default MatchesView;
