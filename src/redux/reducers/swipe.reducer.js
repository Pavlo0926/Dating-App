import { createReducer } from "reduxsauce";
import { SwipeTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.swipe;

const logout = (state, action) => INITIAL_STATE;

const requestCards = (state, action) => ({
  ...state,
  isLoadingCards: true,
});

const requestCardsSuccess = (state, action) => ({
  ...state,
  cards: action.swipeData.swipe,
  likecount: action.swipeData.like_info.like,
  isLoadingCards: false,
});

const requestCardsFail = (state, action) => ({
  ...state,
  isLoadingCards: false,
});

const addLike = (state, action) => ({
  ...state,
});
const addLikeSuccess = (state, action) => ({
  ...state,
});
const addLikeFail = (state, action) => ({
  ...state,
});

const addLikes = (state, action) => ({
  ...state,
});
const addLikesSuccess = (state, action) => ({
  ...state,
});
const addLikesFail = (state, action) => ({
  ...state,
});

const addDisLike = (state, action) => ({
  ...state,
});
const addSuperLike = (state, action) => ({
  ...state,
  isSuperLiking: true,
});
const addSuperLikeDone = (state, action) => ({
  ...state,
  isSuperLiking: false,
});

const requestMatch = (state, action) => ({
  ...state,
  isLoadingMatch: true,
});
const requestMatchSuccess = (state, action) => ({
  ...state,
  isLoadingMatch: false,
});
const requestMatchFail = (state, action) => ({
  ...state,
  isLoadingMatch: false,
});

const requestGetSettings = (state, action) => ({
  ...state,
});
const requestGetSettingsSuccess = (state, action) => ({
  ...state,
  settings: action.settings,
});
const requestGetSettingsFail = (state, action) => ({
  ...state,
  settings: null,
});

const requestSetSettings = (state, action) => ({
  ...state,
});
const requestSetSettingsSuccess = (state, action) => ({
  ...state,
  settings: action.settings,
});
const requestSetSettingsFail = (state, action) => ({
  ...state,
  settings: null,
});

const requestRunBoost = (state, action) => ({
  ...state,
  isBoosting: true,
});
const runBoostSuccess = (state, action) => ({
  ...state,
  isBoosting: false,
});
const requestRunRewinds = (state, action) => ({
  ...state,
  isRewinding: true,
});
const runRewindsSuccess = (state, action) => ({
  ...state,
  isRewinding: false,
});

const updateTutorialMode = (state, action) => ({
  ...state,
  showSwipeTutorial: action.show,
});

export const HANDLERS = {
  [SwipeTypes.REQUEST_CARDS]: requestCards,
  [SwipeTypes.REQUEST_CARDS_SUCCESS]: requestCardsSuccess,
  [SwipeTypes.REQUEST_CARDS_FAIL]: requestCardsFail,

  [SwipeTypes.ADD_LIKE]: addLike,
  [SwipeTypes.ADD_LIKE_SUCCESS]: addLikeSuccess,
  [SwipeTypes.ADD_LIKE_FAIL]: addLikeFail,

  [SwipeTypes.ADD_LIKES]: addLikes,
  [SwipeTypes.ADD_LIKES_SUCCESS]: addLikesSuccess,
  [SwipeTypes.ADD_LIKES_FAIL]: addLikesFail,

  [SwipeTypes.ADD_DIS_LIKE]: addDisLike,
  [SwipeTypes.ADD_SUPER_LIKE]: addSuperLike,
  [SwipeTypes.ADD_SUPER_LIKE_DONE]: addSuperLikeDone,

  [SwipeTypes.REQUEST_MATCH]: requestMatch,
  [SwipeTypes.REQUEST_MATCH_SUCCESS]: requestMatchSuccess,
  [SwipeTypes.REQUEST_MATCH_FAIL]: requestMatchFail,

  [SwipeTypes.REQUEST_GET_SETTINGS]: requestGetSettings,
  [SwipeTypes.REQUEST_GET_SETTINGS_SUCCESS]: requestGetSettingsSuccess,
  [SwipeTypes.REQUEST_GET_SETTINGS_FAIL]: requestGetSettingsFail,

  [SwipeTypes.REQUEST_SET_SETTINGS]: requestSetSettings,
  [SwipeTypes.REQUEST_SET_SETTINGS_SUCCESS]: requestSetSettingsSuccess,
  [SwipeTypes.REQUEST_SET_SETTINGS_FAIL]: requestSetSettingsFail,

  [SwipeTypes.REQUEST_RUN_BOOST]: requestRunBoost,
  [SwipeTypes.RUN_BOOST_SUCCESS]: runBoostSuccess,
  [SwipeTypes.REQUEST_RUN_REWINDS]: requestRunRewinds,
  [SwipeTypes.RUN_REWINDS_SUCCESS]: runRewindsSuccess,

  [SwipeTypes.UPDATE_TUTORIAL_MODE]: updateTutorialMode,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);
