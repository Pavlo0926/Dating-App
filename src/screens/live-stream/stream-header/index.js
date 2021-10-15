import StreamHeader from "./stream-header";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    broadcasters: state.live.broadcasters,
    audiences: state.live.audiences,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StreamHeader);
