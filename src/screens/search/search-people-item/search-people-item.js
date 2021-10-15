import React, { useState, useEffect } from "react";
import { View } from "react-native";
import EventBus from "eventing-bus";
import { Text, Touchable, GradientButton, SolidButton, IconButton } from "@components";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import styles from "./search-people-item.style";
import FastImage from "react-native-fast-image";
import Images from "@assets/Images";

const SearchPeopleItem: () => React$Node = props => {
  const [adding, setAdding] = useState(false);
  const [isFriend, setIsFriend] = useState(props.item.friend === 2);
  const { id, images, first_name, username } = props.item;

  const peoplePicture = id === 0 ? null : images.length === 0 ? null : images[0].path;

  useEffect(() => {
    let addAction = EventBus.on("ADDFRIEND", (userName, success) => {
      if (userName === username) {
        setAdding(false);
        setIsFriend(success);
      }
    });
    return addAction;
  });

  const onRequestFriend = () => {
    setAdding(true);
    props.addFriend(username, props.token);
  };

  return (
    <Touchable
      onPress={() => {
        if (id !== 0) {
          if (props.onDismiss) {
            props.onDismiss();
          }
          NavigationService.navigate(SCREENS.PROFILE_VIEW, { user: props.item });
        }
      }}
    >
      <View style={styles.messageContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            source={
              id === 0 ? require("@assets/images/app-icon.png") :
              peoplePicture === null
                ? require("@assets/images/message-image.png")
                : { uri: peoplePicture }
            }
            style={styles.image}
          />
        </View>
        <View style={styles.messageContentContainer}>
          <Text style={styles.subject}>
            {id === 0 ? "Pluzo Team" : first_name === null ? "no name" : first_name}
          </Text>
          <Text style={styles.preview}>{username}</Text>
        </View>
        <View style={styles.timeContainer}>
          {id !== 0 && props.friend &&
          <View style={styles.removeFriendButton}>
            <IconButton
              backColor={"#FF0036"}
              icon={Images.app.icCross}
              iconWidth={12}
              iconHeight={12}
              onPress={() => props.onRemoveFriend && props.onRemoveFriend()}
            />
          </View>}
          {props.friend ? (
            <GradientButton
              containerStyle={styles.addButton}
              textStyle={styles.addButtonText}
              text={"Chat"}
              onPress={() => {
                if (props.onChat) {
                  props.onChat();
                }
                NavigationService.navigate(SCREENS.CHAT, { chatUser: id === 0 ? 0 : props.item });
              }}
            />
          ) : isFriend === true ? (
            <SolidButton
              containerStyle={styles.addButton}
              textStyle={styles.addButtonText}
              disabled={true}
              text={"Sent"}
            />
          ) : (
            <GradientButton
              containerStyle={styles.addButton}
              textStyle={styles.addButtonText}
              text={"Add"}
              loading={adding}
              onPress={onRequestFriend}
            />
          )}
        </View>
      </View>
    </Touchable>
  );
};

export default SearchPeopleItem;
