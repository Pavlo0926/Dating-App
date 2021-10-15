import { createReducer } from "reduxsauce";
import { InboxTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.inbox;

const logout = (state, action) => INITIAL_STATE;

const requestChannels = (state, action) => ({
  ...state,
  isLoadingChannels: true,
  // channels: action.channels,
});
const loadChannelsDone = (state, action) => ({
  ...state,
  channels: action.channels,
  isLoadingChannels: false,
});

const requestAddFriend = (state, action) => ({
  ...state,
  isAddingFriend: true,
});
const addFriendSuccess = (state, action) => ({
  ...state,
  isAddingFriend: false,
});
const addFriendFailure = (state, action) => ({
  ...state,
  isAddingFriend: false,
});

const requestAcceptFriend = (state, action) => ({
  ...state,
});
const acceptFriendSuccess = (state, action) => ({
  ...state,
});
const acceptFriendFailure = (state, action) => ({
  ...state,
});

const requestRejectFriend = (state, action) => ({
  ...state,
});
const rejectFriendSuccess = (state, action) => ({
  ...state,
});
const rejectFriendFailure = (state, action) => ({
  ...state,
});

const requestPendingFriends = (state, action) => ({
  ...state,
  isLoadingPendingFriends: true,
});
const pendingFriendsSuccess = (state, action) => ({
  ...state,
  pendingFriends: action.pendingData,
  isLoadingPendingFriends: false,
});
const pendingFriendsFailure = (state, action) => ({
  ...state,
  isLoadingPendingFriends: false,
});
const updatePendingFriends = (state, action) => ({
  ...state,
  pendingFriends: action.pendingFriends,
});

const requestFriends = (state, action) => ({
  ...state,
  isLoadingFriends: true,
});
const requestFriendsSuccess = (state, action) => ({
  ...state,
  friends: action.friends,
  isLoadingFriends: false,
});
const requestFriendsFailure = (state, action) => ({
  ...state,
  isLoadingFriends: false,
});

const requestReadFlag = (state, action) => ({
  ...state,
});

export const HANDLERS = {
  [InboxTypes.REQUEST_CHANNELS]: requestChannels,
  [InboxTypes.LOAD_CHANNELS_DONE]: loadChannelsDone,

  [InboxTypes.REQUEST_ADD_FRIEND]: requestAddFriend,
  [InboxTypes.ADD_FRIEND_SUCCESS]: addFriendSuccess,
  [InboxTypes.ADD_FRIEND_FAILURE]: addFriendFailure,

  [InboxTypes.REQUEST_ACCEPT_FRIEND]: requestAcceptFriend,
  [InboxTypes.ACCEPT_FRIEND_SUCCESS]: acceptFriendSuccess,
  [InboxTypes.ACCEPT_FRIEND_FAILURE]: acceptFriendFailure,

  [InboxTypes.REQUEST_REJECT_FRIEND]: requestRejectFriend,
  [InboxTypes.REJECT_FRIEND_SUCCESS]: rejectFriendSuccess,
  [InboxTypes.REJECT_FRIEND_FAILURE]: rejectFriendFailure,

  [InboxTypes.REQUEST_PENDING_FRIENDS]: requestPendingFriends,
  [InboxTypes.PENDING_FRIENDS_SUCCESS]: pendingFriendsSuccess,
  [InboxTypes.PENDING_FRIENDS_FAILURE]: pendingFriendsFailure,
  [InboxTypes.UPDATE_PENDING_FRIENDS]: updatePendingFriends,

  [InboxTypes.REQUEST_FRIENDS]: requestFriends,
  [InboxTypes.REQUEST_FRIENDS_SUCCESS]: requestFriendsSuccess,
  [InboxTypes.REQUEST_FRIENDS_FAILURE]: requestFriendsFailure,

  [InboxTypes.REQUEST_READ_FLAG]: requestReadFlag,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);
