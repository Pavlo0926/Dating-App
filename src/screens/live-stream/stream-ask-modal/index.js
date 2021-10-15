import StreamAskModal from "./stream-ask-modal";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    isAskedToJoin: state.live.isAskedToJoin,
  };
}

const mapDispatchToProps = {
  setAskedToJoin: LiveCreators.setAskedToJoin,
  requestUserAskJoin: LiveCreators.requestUserAskJoin,
  requestUserCancelAsk: LiveCreators.requestUserCancelAsk,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamAskModal);
