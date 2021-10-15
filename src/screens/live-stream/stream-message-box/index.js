import StreamMessageBox from "./stream-message-box";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    messages: state.live.messages,
    isAskedToJoin: state.live.isAskedToJoin,
  };
}

const mapDispatchToProps = {
  updateMessages: LiveCreators.updateMessages,
  requestChatAdd: LiveCreators.requestStreamChatAddMsg,
  setStreamStatus: LiveCreators.setStreamStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamMessageBox);
