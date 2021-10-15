import ResetPassword from "./reset-password.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isResettingPassword: state.user.isResettingPassword,
  };
}

const mapDispatchToProps = {
  requestResetPassword: UserCreators.requestResetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
