import LiveStream from "./live-stream.screen";
import { LiveCreators } from "@redux/actions";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  setAskedToJoin: LiveCreators.setAskedToJoin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
