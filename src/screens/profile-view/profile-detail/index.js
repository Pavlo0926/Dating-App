import ProfileDetail from "./profile-detail";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    location: state.user.location,
    owner: state.user.user,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
