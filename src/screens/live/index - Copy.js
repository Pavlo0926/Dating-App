import Live from "./live.screen";
import { connect } from "react-redux";
import { LiveCreators, UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    streamStatus: state.live.streamStatus,
    allStreams: state.live.allStreams,
    trendingStreams: state.live.trendingStreams,
    channelName: state.live.channelName,
  };
}

const mapDispatchToProps = {
  requestStreamList: LiveCreators.requestStreamList,
  updateUser: UserCreators.requestUpdateUser,
  updateStreamInfo: LiveCreators.updateStreamInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Live);
