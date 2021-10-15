import SearchScreen from "./search.screen";
import { connect } from "react-redux";
import { SearchCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isSearching: state.search.isSearching,
    friends: state.search.friends,
    chat: state.search.chat,
    people: state.search.people,
    live: state.search.live,
    token: state.user.token,
    user: state.user.user,
    streamStatus: state.live.streamStatus,
    channelName: state.live.channelName,
  };
}

const mapDispatchToProps = {
  initSearch: SearchCreators.initializeSearch,
  search: SearchCreators.requestSearch,
  updateSearchLive: SearchCreators.updateSearchLive,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
