import StreamSpeakerView from "./stream-speaker-view";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    token: state.user.token,
    stream: state.live.stream,
    mutedUsers: state.live.mutedUsers,
    remoteMutedUsers: state.live.remoteMutedUsers,
    messages: state.live.messages,
  };
}

const mapDispatchToProps = {
  requestStreamBanUser: LiveCreators.requestStreamBanUser,
  requestStreamKickUser: LiveCreators.requestStreamKickUser,
  updateMessages: LiveCreators.updateMessages,
  requestChatAdd: LiveCreators.requestStreamChatAddMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamSpeakerView);
