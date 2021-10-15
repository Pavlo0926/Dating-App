import SafetyPrivacy from "./safety-privacy";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    blockedUsers: state.user.blockedUsers,
  };
}

const mapDispatchToProps = {
  getBlockedUsers: UserCreators.requestBlockedUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SafetyPrivacy);
