import SwipeSettings from "./swipe-settings.screen";
import { connect } from "react-redux";
import { SwipeCreators, UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    settings: state.swipe.settings,
  };
}

const mapDispatchToProps = {
  loadSettings: SwipeCreators.requestGetSettings,
  updateSettings: SwipeCreators.requestSetSettings,
  updateUser: UserCreators.requestUpdateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SwipeSettings);
