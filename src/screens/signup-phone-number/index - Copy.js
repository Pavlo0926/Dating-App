import SignupPhoneNumber from "./signup-phone-number.screen";
import { connect } from "react-redux";
import { RegistrationCreators, UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    phoneNumber: state.registration.phoneNumber,
    isRegistring: state.user.isRegistring,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  setPhoneNumber: RegistrationCreators.setPhoneNumber,
  resetRegistration: RegistrationCreators.resetRegistration,
  requestRegistration: UserCreators.requestRegistration,
  logout: UserCreators.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPhoneNumber);
