import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestCards: ["token"],
  requestCardsSuccess: ["swipeData"],
  requestCardsFail: null,

  addLike: ["token", "userId"],
  addLikeSuccess: null,
  addLikeFail: null,

  addLikes: ["token", "userIds"],
  addLikesSuccess: null,
  addLikesFail: null,

  addDisLike: ["token", "userId"],
  addSuperLike: ["token", "userId"],
  addSuperLikeDone: null,

  requestMatch: ["token"],
  requestMatchSuccess: null,
  requestMatchFail: null,

  requestGetSettings: ["token"],
  requestGetSettingsSuccess: ["settings"],
  requestGetSettingsFail: null,

  requestSetSettings: ["token", "params"],
  requestSetSettingsSuccess: ["settings"],
  requestSetSettingsFail: null,

  requestRunBoost: ["token", "boostType", "channelName"],
  runBoostSuccess: null,
  requestRunRewinds: ["token", "userId"],
  runRewindsSuccess: null,

  updateTutorialMode: ["show"],
});

export const SwipeTypes = Types;
export const SwipeCreators = Creators;
