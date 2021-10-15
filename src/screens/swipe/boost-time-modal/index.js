import BoostTimeModal from "./boost-time-modal";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    inviteOnly: state.live.inviteOnly,
    boostEndTime: state.live.boostEndTime,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BoostTimeModal);