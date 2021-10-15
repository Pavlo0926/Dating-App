import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { GradientButton, Screen, Text, Image, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { AppTags } from "@config";
import Images from "@assets/Images";

import styles from "./stream-emoji-view.style";

const StreamEmojiView: () => React$Node = props => {
  const [expandCategory, setExpandCategory] = useState(false);

  const data = [];
  Object.values(AppTags).forEach(value => {
    data.push(value);
  });

  const onChangeEmoji = item => {
    props.onChangeEmoji && props.onChangeEmoji(item);
  };

  return (
    <View>
      <Screen hasGradient style={styles.container}>
        <Text style={styles.trendingText}>Trending</Text>
        <View style={styles.iconsContainer}>
          {data.map(item => {
            return (
              <Touchable
                key={`trending-${item.id}`}
                style={styles.emojiButton}
                onPress={() => onChangeEmoji(item)}
              >
                {/* <Image source={Images.live[item.icon]} /> */}
                <View style={[styles.itemColorView, { backgroundColor: item.color }]} />
              </Touchable>
            );
          })}
        </View>
        {!expandCategory && <View style={styles.spacerView} />}
        {expandCategory && <Text style={styles.trendingText}>All</Text>}
        {expandCategory && (
          <ScrollView style={styles.allContainer}>
            <View style={styles.iconsContainer}>
              {data.map(item => {
                return (
                  <Touchable
                    key={`all-${item.id}`}
                    style={styles.emojiButton}
                    onPress={() => onChangeEmoji(item)}
                  >
                    {/* <Image source={Images.live[item.icon]} /> */}
                    <View style={[styles.itemColorView, { backgroundColor: item.color }]} />
                  </Touchable>
                );
              })}
            </View>
          </ScrollView>
        )}
      </Screen>
      {expandCategory && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.fadeContainer}
          colors={["rgba(26, 2, 62, 0.18)", "rgba(26, 2, 62, 1)"]}
          pointerEvents={"none"}
        />
      )}
      <View style={styles.expandButtonContainer}>
        <GradientButton
          onPress={() => setExpandCategory(!expandCategory)}
          containerStyle={styles.expandButton}
          icon={expandCategory ? Images.app.icBackUp : Images.app.icBack}
          iconStyle={styles.expandIcon}
        />
      </View>
    </View>
  );
};

export default StreamEmojiView;
