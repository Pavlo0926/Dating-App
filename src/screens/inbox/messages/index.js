import Messages from "./messages";
import { withNavigationFocus } from "react-navigation";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isLoadingChannels: state.inbox.isLoadingChannels,
    channels: state.inbox.channels,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  requestChannels: InboxCreators.requestChannels,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigationFocus(Messages));
