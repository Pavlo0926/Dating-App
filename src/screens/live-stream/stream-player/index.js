import StreamPlayer from "./stream-player";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    broadcasters: state.live.broadcasters,
    audiences: state.live.audiences,
    isEnabledCamera: state.live.isEnabledCamera,
    isEnabledMic: state.live.isEnabledMic,
    isAskedToJoin: state.live.isAskedToJoin,
    mutedUsers: state.live.mutedUsers,
    remoteMutedUsers: state.live.remoteMutedUsers,
    askedUsers: state.live.askedUsers,
  };
}

const mapDispatchToProps = {
  streamStop: LiveCreators.requestStreamStop,
  streamUserList: LiveCreators.requestStreamUserList,
  streamJoin: LiveCreators.requestStreamJoin,
  streamLeave: LiveCreators.requestStreamLeave,
  streamUserType: LiveCreators.requestStreamUserType,
  streamAcceptJoin: LiveCreators.requestStreamAcceptJoin,
  streamRefusedJoin: LiveCreators.requestStreamRefusedJoin,
  userAcceptJoin: LiveCreators.requestUserAcceptJoin,
  userRefusedJoin: LiveCreators.requestUserRefusedJoin,
  setAskedToJoin: LiveCreators.setAskedToJoin,
  updateAudiences: LiveCreators.updateAudiences,
  updateBroadcasters: LiveCreators.updateBroadcasters,
  updateMessages: LiveCreators.updateMessages,
  resetEnabledSettings: LiveCreators.resetEnabledSettings,
  updateMutedUsers: LiveCreators.updateMutedUsers,
  updateRemoteMutedUsers: LiveCreators.updateRemoteMutedUsers,
  updateAskedUsers: LiveCreators.updateAskedUsers,
  updateStreamInfo: LiveCreators.updateStreamInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer);
