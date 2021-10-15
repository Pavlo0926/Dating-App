import ReportModal from "./report-modal";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportModal);
