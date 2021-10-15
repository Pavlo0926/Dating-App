import { createReducer } from "reduxsauce";
import { SearchTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.search;

const logout = (state, action) => INITIAL_STATE;

const requestSearch = (state, action) => ({
  ...state,
  isSearching: true,
});
const searchSuccess = (state, action) => ({
  ...state,
  isSearching: false,
  friends: action.results.friends,
  chat: action.results.chat,
  people: action.results.people,
  live: action.results.live,
});
const searchFailure = (state, action) => ({
  ...state,
  isSearching: false,
  friends: [],
  chat: [],
  people: [],
  live: [],
});
const initializeSearch = (state, action) => ({
  ...state,
  isSearching: false,
  friends: [],
  chat: [],
  people: [],
  live: [],
});

const updateSearchLive = (state, action) => ({
  ...state,
  live: action.data,
});

export const HANDLERS = {
  [SearchTypes.REQUEST_SEARCH]: requestSearch,
  [SearchTypes.SEARCH_SUCCESS]: searchSuccess,
  [SearchTypes.SEARCH_FAILURE]: searchFailure,

  [SearchTypes.UPDATE_SEARCH_LIVE]: updateSearchLive,

  [SearchTypes.INITIALIZE_SEARCH]: initializeSearch,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);
