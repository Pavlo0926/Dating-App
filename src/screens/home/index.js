import Home from "./home";
import { connect } from "react-redux";
import { LiveCreators, InboxCreators, UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    streamStatus: state.live.streamStatus,
    isScrolling: state.live.isScrolling,
    notification: state.user.notification,
  };
}

const mapDispatchToProps = {
  setStreamStatus: LiveCreators.setStreamStatus,
  updateMessages: LiveCreators.updateMessages,
  loadPendingRequests: InboxCreators.requestPendingFriends,
  acceptFriendRequest: InboxCreators.requestAcceptFriend,
  rejectFriendRequest: InboxCreators.requestRejectFriend,
  updateNotification: UserCreators.updateNotification,
  initLiveUsers: LiveCreators.streamUserListSuccess,
  updateChannelName: LiveCreators.updateChannelName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
