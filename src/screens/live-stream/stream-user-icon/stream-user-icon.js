import PropTypes from "prop-types";
import React, { Component } from "react";
import FastImage from "react-native-fast-image";
import { View } from "react-native";
import { Image, Touchable } from "@components";
import Images from "@assets/Images";

import styles from "./stream-user-icon.style";

class StreamUserIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isBroadcaster, user } = this.props;
    let isMuted = this.props.mutedUsers.includes((user.id || user._id));
    let isRemoteMuted = this.props.remoteMutedUsers.includes((user.id || user._id));
    return (
      <Touchable
        style={[styles.container, this.props.style]}
        disabled={this.props.onImagePress ? false : true}
        onPress={() => this.props.onImagePress && this.props.onImagePress()}
      >
        <FastImage source={{ uri: user.images[0].path }} style={styles.image} />
        {isBroadcaster && (
          <View style={[styles.micContainer, (isMuted || isRemoteMuted) ? styles.muted : {}]}>
            <Image source={Images.app.icMic} style={styles.mic} />
          </View>
        )}
      </Touchable>
    );
  }
}

StreamUserIcon.propTypes = {
  isBroadcaster: PropTypes.bool,
};

StreamUserIcon.defaultProps = {
  isBroadcaster: true,
};

export default StreamUserIcon;
