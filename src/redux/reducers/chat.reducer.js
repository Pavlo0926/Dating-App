import { createReducer } from "reduxsauce";
import { ChatTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.chat;

const logout = (state, action) => INITIAL_STATE;

const requestGetCurrentChat = (state, action) => ({
  ...state,
  isLoadingMessages: true,
  chatUserId: action.chatUserId,
});
const getCurrentChatSuccess = (state, action) => ({
  ...state,
  isLoadingMessages: false,
  messages: action.messages,
});
const getCurrentChatFailure = (state, action) => ({
  ...state,
  isLoadingMessages: false,
  messages: [],
});

const updateCurrentMsg = (state, action) => ({
  ...state,
  messages: action.messages,
});

const updateMessagesState = (state, action) => {
  let messages = state.messages.map((message) => {
    return {
      ...message,
      message_info: {
        sent: 1,
        received: 1,
      }
    }
  });
  return {...state, messages}

}

const requestSendMsg = (state, action) => ({
  ...state,
});

const requestReadMsg = (state, action) => ({
  ...state,
});

const requestOpenChat = (state, action) => ({
  ...state,
});
const requestCloseChat = (state, action) => ({
  ...state,
  chatUserId: null,
});

export const HANDLERS = {
  [ChatTypes.REQUEST_GET_CURRENT_CHAT]: requestGetCurrentChat,
  [ChatTypes.GET_CURRENT_CHAT_SUCCESS]: getCurrentChatSuccess,
  [ChatTypes.GET_CURRENT_CHAT_FAILURE]: getCurrentChatFailure,

  [ChatTypes.UPDATE_CURRENT_MSG]: updateCurrentMsg,

  [ChatTypes.UPDATE_MESSAGES_STATE]: updateMessagesState,

  [ChatTypes.REQUEST_SEND_MSG]: requestSendMsg,

  [ChatTypes.REQUEST_READ_MSG]: requestReadMsg,

  [ChatTypes.REQUEST_CLOSE_CHAT]: requestCloseChat,
  [ChatTypes.REQUEST_OPEN_CHAT]: requestOpenChat,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);
