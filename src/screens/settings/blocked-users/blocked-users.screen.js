import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import Images from "@assets/Images";

import Header from "../header";
import styles from "./blocked-users.style";

const BlockedUsersScreen: () => React$Node = props => {

  const { token } = props;

  const onUnblockUser = (blockedUser) => {
    props.userUnblock(blockedUser._id, token);
    let newData = props.blockedUsers.filter((value) => value.user_target_id._id !== blockedUser._id);
    props.updateBlockedUsers(newData);
  }

  const renderItem = (blockedUser) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: blockedUser.images[0].path}} style={styles.itemImage} resiz/>
        <View style={styles.flexFill}>
          <Text style={styles.itemName}>{blockedUser.first_name}</Text>
          <Text style={styles.itemSubName}>{blockedUser.username}</Text>
        </View>
        <Touchable style={styles.itemButton}
          onPress={() => onUnblockUser(blockedUser)}>
          <Text style={styles.itemButtonText}>Unblock</Text>
        </Touchable>
      </View>
    );
  };

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={"Blocked users"} onBack={props.navigation.goBack} />

          <FlatList
            data={props.blockedUsers}
            keyExtractor={(item, index) => `blocked-user-${item.user_target_id._id}`}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({ item: item, index }) => {
              return renderItem(item.user_target_id);
            }}
          />
          
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default BlockedUsersScreen;
