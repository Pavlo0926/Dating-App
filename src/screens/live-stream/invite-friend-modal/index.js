import InviteFriendsModal from "./invite-friend-modal";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    friends: state.inbox.friends,
    stream: state.live.stream,
  };
}

const mapDispatchToProps = {
  loadFriends: InboxCreators.requestFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriendsModal);
