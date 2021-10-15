import BlockedUsersScreen from "./blocked-users.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    blockedUsers: state.user.blockedUsers,
  };
}

const mapDispatchToProps = {
  userUnblock: UserCreators.requestUnblockUser,
  updateBlockedUsers: UserCreators.loadBlockedUsersSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockedUsersScreen);