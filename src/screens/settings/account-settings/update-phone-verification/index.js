import UpdatePhoneVerification from "./update-phone-verification.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    isSendingPhoneVerificationCode: state.user.isSendingPhoneUpdateCode,
    verificationInProgress: state.user.isConfirmingPhoneUpdateCode,
  };
}

const mapDispatchToProps = {
  requestUpdatePhoneSendCode: UserCreators.requestUpdatePhoneSendCode,
  requestUpdatePhoneConfirmCode: UserCreators.requestUpdatePhoneConfirmCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePhoneVerification);
