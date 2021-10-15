import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Text, Screen, BlurView, Touchable, NotificationModal } from "@components";
import Modal from "react-native-modal";
import SearchPeopleItem from "../../search/search-people-item";
import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

import styles from "./friends-modal.style";

const FriendsModal: () => React$Node = props => {
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false);
  const onModalWillShow = () => {
    props.loadFriends(props.token);
  };

  const onDeleteUser = () => {
    if (this.removeUser) {
      let userId = this.removeUser.id || this.removeUser._id;

      let data = new FormData();
      data.append("username", this.removeUser.username || user.name);
      data.append("user_target_id", userId);

      let url = `${API_ENDPOINTS.REMOVE_FRIEND}`;

      API.request({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + props.token,
        },
        data,
      });
    }
  }

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={props.onSwipeComplete}>
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='#0B0516'
          />
        </Touchable>
      }
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      backdropTransitionOutTiming={0}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      onModalWillShow={onModalWillShow}
      swipeDirection={"down"}
      onSwipeComplete={props.onSwipeComplete}
    >
      <Screen hasGradient style={styles.container}>
        <View style={styles.header}>
          {/* <BackButton onPress={props.onSwipeComplete} /> */}
          <Text style={styles.titleText}>{`${
            props.friends === null ? "0" : props.friends.length
          } friends`}</Text>
        </View>
        <FlatList
          style={styles.friendList}
          keyExtractor={friend => `friend-id-${friend.id}`}
          data={props.friends}
          renderItem={({ item: friend, index }) => {
            return (
              <View style={styles.itemContainer}>
                <SearchPeopleItem
                  item={friend}
                  friend={true}
                  onChat={() => props.onSwipeComplete()}
                  onDismiss={() => props.onSwipeComplete()}
                  onRemoveFriend={() => {
                    this.removeUser = friend;
                    setVisibleConfirmDelete(true);
                  }}
                />
              </View>
            );
          }}
        />
        <NotificationModal
          isVisible={visibleConfirmDelete}
          onBack={() => setVisibleConfirmDelete(false)}
          onConfirm={(userId, userName) => {
            setVisibleConfirmDelete(false);
            onDeleteUser();
          }}
        />
      </Screen>
    </Modal>
  );
};

export default FriendsModal;
