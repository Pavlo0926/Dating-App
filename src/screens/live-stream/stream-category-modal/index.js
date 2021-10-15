import StreamCategoryModal from "./stream-category-modal";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    stream: state.live.stream,
  };
}

const mapDispatchToProps = {
  streamUpdateSuccess: LiveCreators.streamUpdateSuccess,
  updateStream: LiveCreators.requestStreamUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamCategoryModal);
