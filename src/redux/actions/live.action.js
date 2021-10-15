import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setStreamStatus: ["streamStatus"],
  setIsScrolling: ["isScrolling"],
  setAskedToJoin: ["askedJoin"],

  /// camera setting
  setEnabledCamera: ["enabled"],
  setEnabledMic: ["enabled"],
  resetEnabledSettings: null,
  updateMutedUsers: ["users"],
  updateRemoteMutedUsers: ["users"],
  updateAskedUsers: ["users"],

  requestStreamUpdate: ["params", "token"],
  streamUpdateSuccess: ["data"],

  /// start strem
  requestStreamStart: ["params", "token"],
  requestStreamStop: ["params", "token"],
  requestStreamJoin: ["channel_id", "token"],
  requestStreamLeave: ["channel_id", "token"],
  requestStreamUserType: ["channel_id", "user_id", "user_type", "token"],

  /// sending or accepting broad requests
  requestStreamAskJoin: ["channel_id", "user_id", "token"],
  requestStreamAcceptJoin: ["channel_id", "user_id", "token"],
  requestStreamRefusedJoin: ["channel_id", "user_id", "token"],
  requestStreamDisconnectBroad: ["channel_id", "user_id", "token"],
  requestUserAskJoin: ["channel_id", "token"],
  requestUserAcceptJoin: ["channel_id", "user_id", "token"],
  requestUserRefusedJoin: ["channel_id", "user_id", "token"],
  requestUserCancelAsk: ["channel_id", "token"],

  // kick, ban, mute
  requestStreamBanUser: ["user_id", "channel_id", "token"],
  requestStreamKickUser: ["user_id", "channel_id", "token"],
  requestStreamBanList: ["channel_id", "token"],

  requestStreamList: ["token"],
  streamListSuccess: ["data"],

  requestStreamUserList: ["channel_id", "token"],
  streamUserListSuccess: ["data"],
  updateAudiences: ["data"],
  updateBroadcasters: ["data"],

  updateMessages: ["messages"],
  requestStreamChatAddMsg: ["channel_id", "message", "msg_type", "token"],
  updateChannelName: ["name"],
  updateStreamInfo: ["boostEndTime", "inviteOnly"],

  /// get filter settings
  getFilterSettings: ["token"],
  setFilterSettings: ["data", "token"],
  setFilterSettingsSuccess: ["data"],
});

export const LiveTypes = Types;
export const LiveCreators = Creators;
