import { call, put, takeEvery } from "redux-saga/effects";
import { SwipeCreators, SwipeTypes, UserCreators } from "../actions";
import {
  getCards,
  sendLike,
  sendLikeAll,
  getMatchUsers,
  getSwipeSetting,
  setSwipeSetting,
  runBoost,
  runRewinds,
} from "@redux/api";
import FastImage from "react-native-fast-image";
import EventBus from "eventing-bus";

export function* watchSwipeRequests() {
  yield takeEvery(SwipeTypes.REQUEST_CARDS, requestCards);
  yield takeEvery(SwipeTypes.ADD_LIKE, addLike);
  yield takeEvery(SwipeTypes.ADD_LIKES, addLikes);
  yield takeEvery(SwipeTypes.ADD_DIS_LIKE, addDisLike);
  yield takeEvery(SwipeTypes.ADD_SUPER_LIKE, addSuperLike);
  yield takeEvery(SwipeTypes.REQUEST_MATCH, requestMatch);
  yield takeEvery(SwipeTypes.REQUEST_GET_SETTINGS, requestGetSettings);
  yield takeEvery(SwipeTypes.REQUEST_SET_SETTINGS, requestSetSettings);
  yield takeEvery(SwipeTypes.REQUEST_RUN_BOOST, requestRunBoost);
  yield takeEvery(SwipeTypes.REQUEST_RUN_REWINDS, requestRunRewinds);
}

function* requestCards(action) {
  try {
    const { token } = action;

    var response = yield call(getCards, token);
    let data = response.data.data.swipe.map(item => ({ uri: (item.images && item.images.length > 0) ? item.images[0].path : "" }));
    FastImage.preload(data.filter((value) => value.uri !== ""));

    yield put(SwipeCreators.requestCardsSuccess(response.data.data));
  } catch (error) {
    console.log(error);
    yield put(SwipeCreators.requestCardsFail());
  }
}

function* addLike(action) {
  try {
    const { token, userId } = action;

    const params = new FormData();
    params.append("user_target_id", userId);
    params.append("is_like", "1");
    const response = yield call(sendLike, params, token);
    
    let lastLikeData = response.data.data.last_like_data;
    if (lastLikeData.like_match === 1) {
      EventBus.publish("New_Matches", lastLikeData.user_target_id);
    }

    yield put(SwipeCreators.addLikeSuccess());
  } catch (error) {
    yield put(SwipeCreators.addLikeFail());
  }
}

function* addLikes(action) {
  try {
    const { token, userIds } = action;

    const params = new FormData();
    userIds.forEach(userId => {
      params.append("user_target_id[]", userId);
    });
    yield call(sendLikeAll, params, token);

    yield put(SwipeCreators.addLikesSuccess());
  } catch (error) {
    yield put(SwipeCreators.addLikesFail());
  }
}

function* addDisLike(action) {
  try {
    const { token, userId } = action;

    const params = new FormData();
    params.append("user_target_id", userId);
    params.append("is_like", "0");
    yield call(sendLike, params, token);
  } catch (error) {
    console.log(error);
  }
}

function* addSuperLike(action) {
  try {
    const { token, userId } = action;

    const params = new FormData();
    params.append("user_target_id", userId);
    params.append("is_like", "2");
    yield call(sendLike, params, token);

    yield put(SwipeCreators.addSuperLikeDone());
  } catch (error) {
    console.log(error);
    yield put(SwipeCreators.addSuperLikeDone());
  }
}

function* requestMatch(action) {
  try {
    const { token } = action;

    yield call(getMatchUsers, token);

    yield put(SwipeCreators.requestMatchSuccess());
  } catch (error) {
    yield put(SwipeCreators.requestMatchFail());
  }
}

function* requestGetSettings(action) {
  try {
    const { token } = action;

    const response = yield call(getSwipeSetting, token);

    yield put(SwipeCreators.requestGetSettingsSuccess(response.data.data));
  } catch (error) {
    yield put(SwipeCreators.requestGetSettingsFail());
  }
}

function* requestSetSettings(action) {
  try {
    const { token, params } = action;

    const requestParams = new FormData();
    requestParams.append("gender", params.gender);
    requestParams.append("age_from", params.age_from);
    requestParams.append("age_to", params.age_to);
    requestParams.append("distance", params.distance);
    requestParams.append("global", params.global);
    requestParams.append("hide", params.hide);
    if (params.latitude !== null && params.longitude !== null) {
      requestParams.append("latitude", params.latitude);
      requestParams.append("longitude", params.longitude);
    }
    requestParams.append("country", params.country);
    requestParams.append("state", params.state);
    requestParams.append("current_location", params.current_location);

    const response = yield call(setSwipeSetting, requestParams, token);

    yield put(SwipeCreators.requestSetSettingsSuccess(response.data.data));
  } catch (error) {
    yield put(SwipeCreators.requestSetSettingsFail());
  }
}

function* requestRunBoost(action) {
  try {
    const { token, boostType, channelName } = action;

    const params = new FormData();
    params.append("type", boostType);
    if (boostType === 2) {
      params.append("channel_id", channelName);
    }
    const response = yield call(runBoost, params, token);
    
    yield put(UserCreators.updateUserSuccess(response.data.data.user));
    yield put(SwipeCreators.runBoostSuccess());
  } catch (error) {
    console.log(error);
    yield put(SwipeCreators.runBoostSuccess());
  }
}

function* requestRunRewinds(action) {
  try {
    const { token, userId } = action;

    let params = new FormData();
    params.append("user_target_id", userId);

    const response = yield call(runRewinds, params, token);
    
    yield put(UserCreators.updateUserSuccess(response.data.data.user));
    yield put(SwipeCreators.runRewindsSuccess());
  } catch (error) {
    console.log("error", error);
    yield put(SwipeCreators.runRewindsSuccess());
  }
}
