import { call, put, takeLatest } from "redux-saga/effects";
import { LiveCreators, LiveTypes } from "../actions";
import {
  streamUpdate,
  streamStart,
  streamStop,
  streamJoin,
  streamLeave,
  streamUserType,
  streamAskJoin,
  streamAcceptJoin,
  streamRefusedJoin,
  streamDisconnectBroad,
  userAskJoin,
  userAcceptJoin,
  userRefusedJoin,
  userCancelAsk,
  streamList,
  streamUserList,
  streamChatAddMsg,
  streamBanUser,
  streamKickUser,
  streamBanList,
  getLiveSettings,
  setLiveSettings
} from "@redux/api";

export function* watchLiveRequests() {
  yield takeLatest(LiveTypes.REQUEST_STREAM_UPDATE, requestStreamUpdate);

  yield takeLatest(LiveTypes.REQUEST_STREAM_START, requestStreamStart);
  yield takeLatest(LiveTypes.REQUEST_STREAM_STOP, requestStreamStop);
  yield takeLatest(LiveTypes.REQUEST_STREAM_JOIN, requestStreamJoin);
  yield takeLatest(LiveTypes.REQUEST_STREAM_LEAVE, requestStreamLeave);
  yield takeLatest(LiveTypes.REQUEST_STREAM_USER_TYPE, requestStreamUserType);

  yield takeLatest(LiveTypes.REQUEST_STREAM_ASK_JOIN, requestStreamAskJoin);
  yield takeLatest(LiveTypes.REQUEST_STREAM_ACCEPT_JOIN, requestStreamAcceptJoin);
  yield takeLatest(LiveTypes.REQUEST_STREAM_REFUSED_JOIN, requestStreamRefusedJoin);
  yield takeLatest(
    LiveTypes.REQUEST_STREAM_DISCONNECT_BROAD,
    requestStreamDisconnectBroad,
  );

  yield takeLatest(LiveTypes.REQUEST_USER_ASK_JOIN, requestUserAskJoin);
  yield takeLatest(LiveTypes.REQUEST_USER_ACCEPT_JOIN, requestUserAcceptJoin);
  yield takeLatest(LiveTypes.REQUEST_USER_REFUSED_JOIN, requestUserRefusedJoin);
  yield takeLatest(LiveTypes.REQUEST_USER_CANCEL_ASK, requestUserCancelAsk);

  yield takeLatest(LiveTypes.REQUEST_STREAM_BAN_USER, requestStreamBanUser);
  yield takeLatest(LiveTypes.REQUEST_STREAM_KICK_USER, requestStreamKickUser);
  yield takeLatest(LiveTypes.REQUEST_STREAM_BAN_LIST, requestStreamBanList);

  yield takeLatest(LiveTypes.REQUEST_STREAM_LIST, requestStreamList);
  yield takeLatest(LiveTypes.REQUEST_STREAM_USER_LIST, requestStreamUserList);

  yield takeLatest(LiveTypes.REQUEST_STREAM_CHAT_ADD_MSG, requestStreamChatAddMsg);

  yield takeLatest(LiveTypes.GET_FILTER_SETTINGS, requestGetSettings);
  yield takeLatest(LiveTypes.SET_FILTER_SETTINGS, requestSetSettings);
}

function* requestStreamUpdate(action) {
  try {
    const { params, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", params.channel);
    requestParams.append("category", params.category);
    requestParams.append("name", params.name);
    if (params.invite_only !== null) {
      requestParams.append("invite_only", params.invite_only);
    }

    const response = yield call(streamUpdate, requestParams, token);
    yield put(LiveCreators.streamUpdateSuccess(response.data.data.stream));
  } catch (error) {
    console.log("stream update >>>", JSON.stringify(error));
  }
}

function* requestStreamStart(action) {
  try {
    const { params, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", params.channel_id);
    requestParams.append("category", params.category);
    requestParams.append("name", params.name);

    const response = yield call(streamStart, requestParams, token);

    yield put(LiveCreators.streamUpdateSuccess(response.data.data.stream));
  } catch (error) {
    console.log("stream start >>>", error);
  }
}

function* requestStreamStop(action) {
  try {
    const { params, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", params.channel_id);

    yield call(streamStop, requestParams, token);
  } catch (error) {
    console.log("stream stop >>>", error.response.data);
  }
}

function* requestStreamJoin(action) {
  try {
    const { channel_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);

    yield call(streamJoin, requestParams, token);
  } catch (error) {
    console.log("stream join >>>", error.response.data.message);
  }
}

function* requestStreamLeave(action) {
  try {
    const { channel_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);

    yield call(streamLeave, requestParams, token);
  } catch (error) {
    console.log("stream leave >>>", error.response.data.message);
  }
}

function* requestStreamUserType(action) {
  try {
    console.log("actions?>>>>", action);
    const { channel_id, user_id, token, user_type } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);
    requestParams.append("type", user_type);

    yield call(streamUserType, requestParams, token);
  } catch (error) {
    console.log(error);
  }
}

function* requestStreamAskJoin(action) {
  try {
    const { channel_id, user_id, token } = action;
    console.log(action);
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(streamAskJoin, requestParams, token);
  } catch (error) {
    console.log("stream ask join >>>", error.response.data.message);
  }
}

function* requestStreamAcceptJoin(action) {
  try {
    const { channel_id, user_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(streamAcceptJoin, requestParams, token);
  } catch (error) {
    console.log("stream accept join >>>", error.response.data.message);
  }
}

function* requestStreamRefusedJoin(action) {
  try {
    const { channel_id, user_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(streamRefusedJoin, requestParams, token);
  } catch (error) {
    console.log("stream refused join >>>", error.response.data.message);
  }
}

function* requestStreamDisconnectBroad(action) {
  try {
    const { channel_id, user_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(streamDisconnectBroad, requestParams, token);
  } catch (error) {
    console.log("stream refused join >>>", error.response.data.message);
  }
}

function* requestUserAskJoin(action) {
  try {
    const { channel_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);

    yield call(userAskJoin, requestParams, token);
  } catch (error) {
    console.log("user ask join >>>", error.response.data.message);
  }
}

function* requestUserAcceptJoin(action) {
  try {
    const { channel_id, user_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(userAcceptJoin, requestParams, token);
  } catch (error) {
    console.log("user accept join >>>", error.response.data.message);
  }
}

function* requestUserRefusedJoin(action) {
  try {
    const { channel_id, user_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(userRefusedJoin, requestParams, token);
  } catch (error) {
    console.log("user refused join >>>", error.response.data.message);
  }
}

function* requestUserCancelAsk(action) {
  try {
    const { channel_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);

    yield call(userCancelAsk, requestParams, token);
  } catch (error) {
    console.log("user cancel ask >>>", error.response.data.message);
  }
}

function* requestStreamBanUser(action) {
  try {
    const { channel_id, user_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(streamBanUser, requestParams, token);
  } catch (error) {
    console.log("stream ban user >>>", error.response.data.message);
  }
}

function* requestStreamKickUser(action) {
  try {
    const { channel_id, user_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    requestParams.append("user_id", user_id);

    yield call(streamKickUser, requestParams, token);
  } catch (error) {
    console.log("stream kick user >>>", error.response.data.message);
  }
}

function* requestStreamBanList(action) {
  try {
    const { channel_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);

    yield call(streamBanList, requestParams, token);
  } catch (error) {
    console.log("stream ban list >>>", error.response.data.message);
  }
}

function* requestStreamList(action) {
  try {
    const { token } = action;

    const response = yield call(streamList, null, token);

    yield put(LiveCreators.streamListSuccess(response.data.data));
  } catch (error) {
    console.log("stream list >>>", error);
  }
}

function* requestStreamUserList(action) {
  try {
    const { channel_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    const response = yield call(streamUserList, requestParams, token);

    yield put(LiveCreators.streamUserListSuccess(response.data.data));
  } catch (error) {
    console.log("stream user list >>>", error);
  }
}

function* requestStreamChatAddMsg(action) {
  try {
    const { channel_id, token, msg_type, message } = action;
    const requestParams = new FormData();

    requestParams.append("channel_id", channel_id);
    requestParams.append("message", message);
    requestParams.append("type", msg_type);

    yield call(streamChatAddMsg, requestParams, token);
  } catch (error) {
    console.log("stream add chat >>>", error.data);
  }
}

function* requestGetSettings(action) {
  try {
    const { token } = action;

    const res = yield call(getLiveSettings, token);
    yield put(LiveCreators.setFilterSettingsSuccess(res.data.data));
  } catch (error) {
    console.log("get live settings >>>", error.data);
  }
}

function* requestSetSettings(action) {
  try {
    const { token, data } = action;
    const requestParams = new FormData();
    
    requestParams.append("filter", data.filter);
    requestParams.append("country", data.country);
    requestParams.append("state", data.state === null ? "Alabama" : data.state);

    const res = yield call(setLiveSettings, requestParams, token);
    yield put(LiveCreators.setFilterSettingsSuccess(res.data.data));
  } catch (error) {
    console.log("set live settings >>>", error);
  }
}