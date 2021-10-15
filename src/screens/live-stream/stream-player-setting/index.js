import StreamPlayerSetting from "./stream-player-setting";
import { LiveCreators } from "@redux/actions";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    isEnabledCamera: state.live.isEnabledCamera,
    isEnabledMic: state.live.isEnabledMic,
  };
}

const mapDispatchToProps = {
  setEnabledCamera: LiveCreators.setEnabledCamera,
  setEnabledMic: LiveCreators.setEnabledMic,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayerSetting);
