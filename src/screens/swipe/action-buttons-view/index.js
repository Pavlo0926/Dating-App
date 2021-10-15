import ActionButtonsView from "./action-buttons-view";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    isSuperLiking: state.swipe.isSuperLiking,
    isBoosting: state.swipe.isBoosting,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonsView);
