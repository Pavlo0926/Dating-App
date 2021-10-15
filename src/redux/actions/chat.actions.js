import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestGetCurrentChat: ["chartId", "chatUserId", "token"],
  getCurrentChatSuccess: ["messages"],
  getCurrentChatFailure: null,

  updateCurrentMsg: ["messages"],

  updateMessagesState: null,

  requestSendMsg: ["params", "token"],

  requestReadMsg: ["params", "token"],

  requestOpenChat: ["chat_id", "token"],
  requestCloseChat: ["chat_id", "token"],
});

export const ChatTypes = Types;
export const ChatCreators = Creators;
