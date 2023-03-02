import SignupGenderSelect from "./signup-gender-select.screen";
import { connect } from "react-redux";
import { RegistrationCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    gender: state.registration.gender,
    likeGender: state.registration.likeGender,
  };
}

const mapDispatchToProps = {
  setGender: RegistrationCreators.setGender,
  setLikeGender: RegistrationCreators.setLikeGender,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupGenderSelect);
