import { call, put, takeEvery } from "redux-saga/effects";
import { InboxCreators, InboxTypes } from "../actions";
import EventBus from "eventing-bus";
import {
  getChatList,
  getFriends,
  acceptFriend,
  rejectFriend,
  addFriendByUsername,
  getPendingRequests,
  readFlag,
} from "@redux/api";

export function* watchInboxRequests() {
  yield takeEvery(InboxTypes.REQUEST_CHANNELS, requestChannels);

  yield takeEvery(InboxTypes.REQUEST_ADD_FRIEND, requestAddFriend);
  yield takeEvery(InboxTypes.REQUEST_ACCEPT_FRIEND, requestAcceptFriend);
  yield takeEvery(InboxTypes.REQUEST_REJECT_FRIEND, requestRejectFriend);
  yield takeEvery(InboxTypes.REQUEST_PENDING_FRIENDS, requestPendingFriends);
  yield takeEvery(InboxTypes.REQUEST_FRIENDS, requestFriends);
  yield takeEvery(InboxTypes.REQUEST_READ_FLAG, requestReadFlag);
}

function* requestChannels(action) {
  try {
    const { token } = action;
    const params = new FormData();
    params.append("limit", 1);
    const response = yield call(getChatList, params, token);

    let channels = response.data.data;
    channels = channels.filter(
      channel => channel.messages && channel.messages.length > 0,
    );
    channels = channels.sort(
      (channel1, channel2) =>
        channel1.messages[0].createdAt < channel2.messages[0].createdAt,
    );

    yield put(InboxCreators.loadChannelsDone(channels));
  } catch (error) {
    yield put(InboxCreators.loadChannelsDone([]));
  }
}

/** Friends */
function* requestAddFriend(action) {
  const { username, token } = action;
  try {
    const params = new FormData();
    params.append("username", username);

    yield call(addFriendByUsername, params, token);

    EventBus.publish("ADDFRIEND", username, true);
    yield put(InboxCreators.addFriendSuccess());
  } catch (error) {
    console.log(error);
    EventBus.publish("ADDFRIEND", username, false);
    yield put(InboxCreators.addFriendFailure());
  }
}

function* requestAcceptFriend(action) {
  try {
    const { user_id, token } = action;
    const params = new FormData();
    params.append("user_target_id", user_id);
    yield call(acceptFriend, params, token);

    yield put(InboxCreators.acceptFriendSuccess());
  } catch (error) {
    yield put(InboxCreators.acceptFriendFailure());
  }
}

function* requestRejectFriend(action) {
  try {
    const { user_id, token } = action;
    const params = new FormData();
    params.append("user_target_id", user_id);
    yield call(rejectFriend, params, token);

    yield put(InboxCreators.rejectFriendSuccess());
  } catch (error) {
    yield put(InboxCreators.rejectFriendFailure());
  }
}

function* requestPendingFriends(action) {
  try {
    const { token } = action;

    const response = yield call(getPendingRequests, token);
    yield put(InboxCreators.pendingFriendsSuccess(response.data.data));
  } catch (error) {
    yield put(InboxCreators.pendingFriendsFailure());
  }
}

function* requestFriends(action) {
  try {
    const { token } = action;

    const response = yield call(getFriends, token);
    yield put(InboxCreators.requestFriendsSuccess(response.data.data));
  } catch (error) {
    yield put(InboxCreators.requestFriendsFailure());
  }
}

function* requestReadFlag(action) {
  try {
    const { user_id, token } = action;

    const requestParams = new FormData();
    requestParams.append("user_id", user_id);

    yield call(readFlag, requestParams, token);
  } catch (error) {
    console.log("read flag >>", error.response.data);
  }
}
