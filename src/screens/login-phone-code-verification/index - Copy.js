import LoginPhoneCodeVerification from "./login-phone-code-verification.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isSendingCode: state.user.isSendingPhoneLoginCode,
    verificationInProgress: state.user.isConfirmingPhoneLoginCode,
  };
}

const mapDispatchToProps = {
  requestPhoneLoginSendCode: UserCreators.requestPhoneLoginSendCode,
  requestPhoneLoginConfirmCode: UserCreators.requestPhoneLoginConfirmCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPhoneCodeVerification);
