import PushNotificationSettings from "./push-notification-settings.screen";
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
};

export default connect(mapStateToProps, mapDispatchToProps)(PushNotificationSettings);
