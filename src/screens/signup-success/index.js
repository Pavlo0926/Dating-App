import SignupSuccess from "./signup-success.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  loginSuccess: UserCreators.loginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupSuccess);
