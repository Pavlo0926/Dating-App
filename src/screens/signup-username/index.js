import SignupUsername from "./signup-username.screen";
import { connect } from "react-redux";
import { RegistrationCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    username: state.registration.username,
    password: state.registration.password,
  };
}

const mapDispatchToProps = {
  setUsername: RegistrationCreators.setUsername,
  setPassword: RegistrationCreators.setPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupUsername);
