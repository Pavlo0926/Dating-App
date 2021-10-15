import AddFriendModal from "./add-friend-modal";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isAddingFriend: state.inbox.isAddingFriend,
    token: state.user.token,
    friends: state.inbox.friends,
  };
}

const mapDispatchToProps = {
  addFriend: InboxCreators.requestAddFriend,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendModal);
