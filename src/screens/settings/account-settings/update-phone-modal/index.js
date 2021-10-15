import UpdatePhoneModal from "./update-phone-modal";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  updateUser: UserCreators.requestUpdateUser,
  updateUserProfile: UserCreators.updateUserSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePhoneModal);
