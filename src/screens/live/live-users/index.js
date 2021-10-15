import LiveUsers from "./live-users";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    streamUsers: state.live.friendStreams,
    streamStatus: state.live.streamStatus,
    channelName: state.live.channelName,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LiveUsers);
