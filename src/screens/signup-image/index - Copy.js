import SignupImage from "./signup-image.screen";
import { connect } from "react-redux";
import { RegistrationCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    picture1: state.registration.picture1,
    picture2: state.registration.picture2,
    picture3: state.registration.picture3,
  };
}

const mapDispatchToProps = {
  setPicture1: RegistrationCreators.setPicture1,
  setPicture2: RegistrationCreators.setPicture2,
  setPicture3: RegistrationCreators.setPicture3,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupImage);
