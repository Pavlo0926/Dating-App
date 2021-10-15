import CountrySelection from "./country-selection";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    filterCountry: state.live.filterCountry,
  };
}

const mapDispatchToProps = {
  setFilterCountry: LiveCreators.setFilterCountry,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelection);
