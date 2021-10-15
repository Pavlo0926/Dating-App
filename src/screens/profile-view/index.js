import ProfileView from "./profile-view.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    owner: state.user.user,
  };
}

const mapDispatchToProps = {
  blockUser: UserCreators.requestBlockUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
