import React from "react";
import { View } from "react-native";
import { Text, Touchable, GradientButton } from "@components";
import FastImage from "react-native-fast-image";
import { GRADIENT } from "@config";
import styles from "./modal-friend-item.style";

const ModalFriendItem: () => React$Node = props => {
  let picture =
    props.user.images !== null
      ? props.user.images[0].path
      : require("@assets/images/live-screen/user-temp3.png");
  let isInvited = props.invitedFriends.includes(props.user.id);

  return (
    <Touchable
      onPress={() => {
        // NavigationService.navigate(SCREENS.PROFILE_VIEW, { user: props.item });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            source={typeof picture === "string" ? { uri: picture } : picture}
            style={styles.image}
          />
        </View>
        <View style={styles.itemContentContainer}>
          <Text style={styles.subject}>{props.user.first_name}</Text>
          <Text style={styles.preview}>{props.user.username}</Text>
        </View>
        <View style={styles.timeContainer}>
          <GradientButton
            onPress={() => props.onInviteFriend && props.onInviteFriend()}
            colors={GRADIENT.BUTTON}
            containerStyle={styles.addButton}
            textStyle={styles.addButtonText}
            disabled={isInvited}
            text={isInvited ? "Invited" : "Invite"}
          />
        </View>
      </View>
    </Touchable>
  );
};

export default ModalFriendItem;
