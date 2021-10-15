import FriendsModal from "./friends-modal";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    isLoadingFriends: state.inbox.isLoadingFriends,
    friends: state.inbox.friends,
  };
}

const mapDispatchToProps = {
  loadFriends: InboxCreators.requestFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsModal);
