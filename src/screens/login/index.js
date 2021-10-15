import LoginScreen from "./login.screen";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isLoggingIn: state.user.isLoggingIn,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  login: UserCreators.requestLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(LoginScreen));
