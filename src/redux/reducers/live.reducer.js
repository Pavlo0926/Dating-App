import actions from "redux-form/lib/actions";
import { createReducer } from "reduxsauce";
import { LiveTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.live;

const logout = (state, action) => INITIAL_STATE;

const setEnabledCamera = (state, action) => ({
  ...state,
  isEnabledCamera: action.enabled,
});
const setEnabledMic = (state, action) => ({
  ...state,
  isEnabledMic: action.enabled,
});
const resetEnabledSettings = (state, action) => ({
  ...state,
  isEnabledCamera: true,
  isEnabledMic: true,
  mutedUsers: [],
  remoteMutedUsers: [],
  askedUsers: [],
  inviteOnly: 0,
  boostEndTime: 0,
});
const updateMutedUsers = (state, action) => ({
  ...state,
  mutedUsers: action.users,
});
const updateRemoteMutedUsers = (state, action) => ({
  ...state,
  remoteMutedUsers: action.users,
});
const updateAskedUsers = (state, action) => ({
  ...state,
  askedUsers: action.users,
});

const setStreamStatus = (state, action) => ({
  ...state,
  streamStatus: action.streamStatus,
});
const setIsScrolling = (state, action) => ({
  ...state,
  isScrolling: action.isScrolling,
});
const setAskedToJoin = (state, action) => ({
  ...state,
  isAskedToJoin: action.askedJoin,
});

const requestStreamUpdate = (state, action) => ({
  ...state,
});
const streamUpdateSuccess = (state, action) => ({
  ...state,
  stream: action.data,
});

const requestStreamStart = (state, action) => ({
  ...state,
});
const requestStreamStop = (state, action) => ({
  ...state,
});
const requestStreamJoin = (state, action) => ({
  ...state,
});
const requestStreamLeave = (state, action) => ({
  ...state,
});
const requestStreamUserType = (state, action) => ({
  ...state,
});
const requestStreamAskJoin = (state, action) => ({
  ...state,
});
const requestStreamAcceptJoin = (state, action) => ({
  ...state,
});
const requestStreamRefusedJoin = (state, action) => ({
  ...state,
});
const requestStreamDisconnectBroad = (state, action) => ({
  ...state,
});
const reqeustUserAskJoin = (state, action) => ({
  ...state,
});
const requestUserAcceptJoin = (state, action) => ({
  ...state,
});
const requestUserRefusedJoin = (state, action) => ({
  ...state,
});
const reqeustUserCancelAsk = (state, action) => ({
  ...state,
});

const requestStreamBanUser = (state, action) => ({
  ...state,
});
const requestStreamKickUser = (state, action) => ({
  ...state,
});
const requestStreamBanList = (state, action) => ({
  ...state,
});

const requestStreamList = (state, action) => ({
  ...state,
});
const streamListSuccess = (state, action) => ({
  ...state,
  allStreams: action.data.all_stream,
  trendingStreams: action.data.trending_list,
  friendStreams: action.data.friends_stream,
});

const requestStreamUserList = (state, action) => ({
  ...state,
});
const streamUserListSuccess = (state, action) => ({
  ...state,
  broadcasters: action.data.broadcasters,
  audiences: action.data.audience,
});
const updateBroadcasters = (state, action) => ({
  ...state,
  broadcasters: action.data,
});
const updateAudiences = (state, action) => ({
  ...state,
  audiences: action.data,
});

const updateMessages = (state, action) => ({
  ...state,
  messages: action.messages,
});
const requestStreamChatAddMsg = (state, action) => ({
  ...state,
});

const updateChannelName = (state, action) => ({
  ...state,
  channelName: action.name,
});
const updateStreamInfo = (state, action) => ({
  ...state,
  inviteOnly: action.inviteOnly,
  boostEndTime: action.boostEndTime,
});

const getFilterSettings = (state, action) => ({
  ...state,
});
const setFilterSettings = (state, action) => ({
  ...state,
});
const setFilterSettingsSuccess = (state, action) => ({
  ...state,
  settings: action.data,
})

export const HANDLERS = {
  [LiveTypes.SET_ENABLED_CAMERA]: setEnabledCamera,
  [LiveTypes.SET_ENABLED_MIC]: setEnabledMic,
  [LiveTypes.RESET_ENABLED_SETTINGS]: resetEnabledSettings,
  [LiveTypes.UPDATE_MUTED_USERS]: updateMutedUsers,
  [LiveTypes.UPDATE_REMOTE_MUTED_USERS]: updateRemoteMutedUsers,
  [LiveTypes.UPDATE_ASKED_USERS]: updateAskedUsers,

  [LiveTypes.SET_STREAM_STATUS]: setStreamStatus,
  [LiveTypes.SET_IS_SCROLLING]: setIsScrolling,
  [LiveTypes.SET_ASKED_TO_JOIN]: setAskedToJoin,

  [LiveTypes.REQUEST_STREAM_UPDATE]: requestStreamUpdate,
  [LiveTypes.STREAM_UPDATE_SUCCESS]: streamUpdateSuccess,

  [LiveTypes.REQUEST_STREAM_START]: requestStreamStart,
  [LiveTypes.REQUEST_STREAM_STOP]: requestStreamStop,
  [LiveTypes.REQUEST_STREAM_JOIN]: requestStreamJoin,
  [LiveTypes.REQUEST_STREAM_LEAVE]: requestStreamLeave,
  [LiveTypes.REQUEST_STREAM_USER_TYPE]: requestStreamUserType,

  [LiveTypes.REQUEST_STREAM_ASK_JOIN]: requestStreamAskJoin,
  [LiveTypes.REQUEST_STREAM_ACCEPT_JOIN]: requestStreamAcceptJoin,
  [LiveTypes.REQUEST_STREAM_REFUSED_JOIN]: requestStreamRefusedJoin,
  [LiveTypes.REQUEST_STREAM_DISCONNECT_BROAD]: requestStreamDisconnectBroad,

  [LiveTypes.REQUEST_USER_ASK_JOIN]: reqeustUserAskJoin,
  [LiveTypes.REQUEST_USER_ACCEPT_JOIN]: requestUserAcceptJoin,
  [LiveTypes.REQUEST_USER_REFUSED_JOIN]: requestUserRefusedJoin,
  [LiveTypes.REQUEST_USER_CANCEL_ASK]: reqeustUserCancelAsk,

  [LiveTypes.REQUEST_STREAM_BAN_USER]: requestStreamBanUser,
  [LiveTypes.REQUEST_STREAM_KICK_USER]: requestStreamKickUser,
  [LiveTypes.REQUEST_STREAM_BAN_LIST]: requestStreamBanList,

  [LiveTypes.REQUEST_STREAM_LIST]: requestStreamList,
  [LiveTypes.STREAM_LIST_SUCCESS]: streamListSuccess,

  [LiveTypes.REQUEST_STREAM_USER_LIST]: requestStreamUserList,
  [LiveTypes.STREAM_USER_LIST_SUCCESS]: streamUserListSuccess,
  [LiveTypes.UPDATE_BROADCASTERS]: updateBroadcasters,
  [LiveTypes.UPDATE_AUDIENCES]: updateAudiences,

  [LiveTypes.UPDATE_MESSAGES]: updateMessages,
  [LiveTypes.REQUEST_STREAM_CHAT_ADD_MSG]: requestStreamChatAddMsg,
  [LiveTypes.UPDATE_CHANNEL_NAME]: updateChannelName,
  [LiveTypes.UPDATE_STREAM_INFO]: updateStreamInfo,

  [LiveTypes.GET_FILTER_SETTINGS]: getFilterSettings,
  [LiveTypes.SET_FILTER_SETTINGS]: setFilterSettings,
  [LiveTypes.SET_FILTER_SETTINGS_SUCCESS]: setFilterSettingsSuccess,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);
