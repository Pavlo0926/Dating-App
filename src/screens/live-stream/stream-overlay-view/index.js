import StreamOverlayView from "./stream-overlay-view";
import { LiveCreators, SwipeCreators } from "@redux/actions";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    streamStatus: state.live.streamStatus,
    broadcasters: state.live.broadcasters,
    audiences: state.live.audiences,
    isBoosting: state.swipe.isBoosting,
    inviteOnly: state.live.inviteOnly,
    boostEndTime: state.live.boostEndTime,
  };
}

const mapDispatchToProps = {
  setStreamStatus: LiveCreators.setStreamStatus,
  setIsScrolling: LiveCreators.setIsScrolling,
  runBoost: SwipeCreators.requestRunBoost,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamOverlayView);
