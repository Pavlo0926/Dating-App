import StreamUsers from "./stream-users";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    broadcasters: state.live.broadcasters,
    audiences: state.live.audiences,
    stream: state.live.stream,
    token: state.user.token,
    user: state.user.user,
    remoteMutedUsers: state.live.remoteMutedUsers,
    askedUsers: state.live.askedUsers,
    messages: state.live.messages,
    isBoosting: state.swipe.isBoosting,
    inviteOnly: state.live.inviteOnly,
  };
}

const mapDispatchToProps = {
  requestStreamAskJoin: LiveCreators.requestStreamAskJoin,
  requestStreamDisconnectBroad: LiveCreators.requestStreamDisconnectBroad,
  updateAudiences: LiveCreators.updateAudiences,
  updateStream: LiveCreators.requestStreamUpdate,
  streamUpdateSuccess: LiveCreators.streamUpdateSuccess,
  requestStreamBanUser: LiveCreators.requestStreamBanUser,
  requestStreamKickUser: LiveCreators.requestStreamKickUser,
  userAcceptJoin: LiveCreators.requestUserAcceptJoin,
  updateAskedUsers: LiveCreators.updateAskedUsers,
  updateMessages: LiveCreators.updateMessages,
  requestChatAdd: LiveCreators.requestStreamChatAddMsg,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSafeAreaInsets(StreamUsers));
