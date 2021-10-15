import StreamUserIcon from "./stream-user-icon";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    mutedUsers: state.live.mutedUsers,
    remoteMutedUsers: state.live.remoteMutedUsers,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamUserIcon);
