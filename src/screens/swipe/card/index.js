import Card from "./card";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    visibleDetail: state.swipe.visibleDetail,
    showAnimation: state.swipe.showSwipeTutorial,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
