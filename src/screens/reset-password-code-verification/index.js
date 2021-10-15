import ResetPasswordCodeVerification from "./reset-password-code-verification.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isSendingCode: state.user.isSendingForgotPasswordCode,
    verificationInProgress: state.user.isConfirmingForgotPasswordCode,
  };
}

const mapDispatchToProps = {
  requestForgotPasswordSendCode: UserCreators.requestForgotPasswordSendCode,
  requestForgotPasswordConfirmCode: UserCreators.requestForgotPasswordConfirmCode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordCodeVerification);
