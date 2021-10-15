import PendingRequestModal from "./pending-request-modal";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    pendingFriends: state.inbox.pendingFriends,
    isLoadingPendingFriends: state.inbox.isLoadingPendingFriends,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  loadRequests: InboxCreators.requestPendingFriends,
  acceptRequest: InboxCreators.requestAcceptFriend,
  rejectRequest: InboxCreators.requestRejectFriend,
  updatePendings: InboxCreators.updatePendingFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequestModal);
