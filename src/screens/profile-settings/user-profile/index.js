import UserProfile from "./user-profile";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    friends: state.inbox.friends,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
