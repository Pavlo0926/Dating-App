import Settings from "./settings.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    isDeletingAccount: state.user.isDeletingAccount,
  };
}

const mapDispatchToProps = {
  logout: UserCreators.logout,
  deleteAccount: UserCreators.requestDeleteAccount,
  updateUser: UserCreators.updateUserSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
