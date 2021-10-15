import SearchPeopleItem from "./search-people-item";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  addFriend: InboxCreators.requestAddFriend,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPeopleItem);
