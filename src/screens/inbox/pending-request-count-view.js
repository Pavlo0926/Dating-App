import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "@components";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

import styles from "./inbox.style";

const PendingRequestCountView: () => React$Node = props => {
  const { loadPendingRequests, token } = props;
  useEffect(() => {
    loadPendingRequests(token);
  }, [loadPendingRequests, token]);

  if (props.pendingFriends.length === 0) {
    return null;
  } else {
    return (
      <View style={props.style ? props.style : styles.pendingCountBadge}>
        <Text style={[styles.pendingCountText, props.textStyle]}>{props.pendingFriends.length}</Text>
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
    pendingFriends: state.inbox.pendingFriends,
  };
}

const mapDispatchToProps = {
  loadPendingRequests: InboxCreators.requestPendingFriends,
};
export default connect(mapStateToProps, mapDispatchToProps)(PendingRequestCountView);
