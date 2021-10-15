import SignupBirthdate from "./signup-birthdate.screen";
import { connect } from "react-redux";
import { RegistrationCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    birthDate: state.registration.birthDate,
  };
}

const mapDispatchToProps = {
  setBirthDate: RegistrationCreators.setBirthDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupBirthdate);
