import StreamStart from "./stream-start";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  streamStart: LiveCreators.requestStreamStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamStart);
