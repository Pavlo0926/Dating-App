import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Image, Text, Touchable } from "@components";
import { AppTags } from "@config";
import Images from "@assets/Images";

import styles from "./live-tags.style";

const LiveTags: () => React$Node = props => {
  const [currentTag, setCurrentTag] = useState(0);

  const data = [{ id: 0, icon: null, selected: false }];
  Object.values(AppTags).forEach(value => {
    data.push(value);
  });

  const onChangeTag = tag => {
    setCurrentTag(tag.id);
    props.onChangeCategory && props.onChangeCategory(tag.id);
  };

  return (
    <FlatList
      horizontal
      style={styles.usersList}
      contentContainerStyle={styles.usersListContentContainerStyle}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={item => `live-category-${item.id}`}
      renderItem={({ item: tag, index }) => {
        let isActive = currentTag === tag.id;
        return (
          <Touchable style={styles.itemContainer} onPress={() => onChangeTag(tag)}>
            {tag.id === 0 && (
              <View style={[styles.itemTextContainer, isActive ? styles.activeItem : {}]}>
                <Text style={styles.itemText}>{"ALL"}</Text>
              </View>
            )}
            {tag.id !== 0 && (
              <View
                style={[styles.itemImageContainer, isActive ? styles.activeItem : {}]}
              >
                {/* <Image source={Images.live[tag.icon]} style={styles.itemImage} /> */}
                <View style={[styles.itemColorView, { backgroundColor: tag.color }]} />
              </View>
            )}
          </Touchable>
        );
      }}
    />
  );
};

export default LiveTags;
