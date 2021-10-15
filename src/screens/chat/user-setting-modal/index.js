import UserSettingModal from "./user-setting-modal";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingModal);
