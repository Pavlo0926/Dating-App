import SignupCodeVerification from "./signup-code-verification.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isSendingPhoneVerificationCode: state.user.isSendingPhoneVerificationCode,
    verificationInProgress: state.user.isConfirmingPhoneVerificationCode,
  };
}

const mapDispatchToProps = {
  requestPhoneVerificationSendCode: UserCreators.requestPhoneVerificationSendCode,
  requestPhoneVerificationConfirmCode: UserCreators.requestPhoneVerificationConfirmCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupCodeVerification);
