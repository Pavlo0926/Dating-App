import React from "react";
import { View, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { Text, UserCount, Touchable } from "@components";
import Images from "@assets/Images";
import { AppBadges } from "@config";
import styles from "./user-profile.style";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, loading } = this.props;

    var userImage = require("@assets/images/live-screen/user-temp3.png");
    var name = "no name";
    if (user !== null) {
      if (user.images.length > 0) {
        let sortedImages = user.images.sort((a, b) => a.sort > b.sort);
        userImage = { uri: sortedImages[0].path };
      }
      if (user.first_name !== null) {
        name = user.first_name;
      }
    }

    return (
      <View style={styles.userContainer}>
        <Touchable onPress={this.props.onAvatarClick}>
          <FastImage source={userImage} style={styles.avatarImage} />
          {loading && (
            <View style={styles.absoluteFill}>
              <ActivityIndicator size={"small"} color={"white"} />
            </View>
          )}
        </Touchable>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Touchable onPress={this.props.onNameClick}>
              <Text style={styles.nameText}>{name}</Text>
            </Touchable>
            {user.badges.map(badge => {
              if (badge > AppBadges.length) return null;
              return (
                <FastImage
                  key={`profile-badge-${badge}`}
                  style={styles.badgeImage}
                  source={Images.badges[AppBadges[badge-1].id]}
                />
              );
            })}
          </View>
          <Text style={styles.usernameText}>{user !== null ? user.username : ""}</Text>
          <Touchable onPress={() => this.props.onFriends()}>
            <UserCount
              count={this.props.friends.length > 0 ? this.props.friends.length : parseInt(user.friends, 10)}
              style={styles.friendsContainer}
              iconStyle={styles.friendsIconImage}
              textStyle={styles.friendsCountText}
            />
          </Touchable>
        </View>
      </View>
    );
  }
}

export default UserProfile;
