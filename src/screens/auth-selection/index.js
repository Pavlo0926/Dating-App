import AuthSelection from "./auth-selection.screen";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AuthSelection));
