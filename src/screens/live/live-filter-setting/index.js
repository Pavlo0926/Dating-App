import LiveFilterSetting from "./live-filter-setting";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    token: state.user.token,
    settings: state.live.settings,
  };
}

const mapDispatchToProps = {
  getFilterSettings: LiveCreators.getFilterSettings,
  setFilterSettings: LiveCreators.setFilterSettings,
  updateFilterSettings: LiveCreators.setFilterSettingsSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveFilterSetting);
