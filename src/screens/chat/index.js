import Chat from "./chat.screen";
import { connect } from "react-redux";
import { ChatCreators, InboxCreators, UserCreators } from "@redux/actions";
import { withSafeAreaInsets } from "react-native-safe-area-context";

function mapStateToProps(state, { navigation }) {
  return {
    token: state.user.token,
    user: state.user.user,
    messages: state.chat.messages,
    loading: state.chat.isLoadingMessages,
    chatUser: navigation.getParam("chatUser"),
    chatId: navigation.getParam("chatId"),
    pushEnabled: state.user.pushEnabled,
  };
}

const mapDispatchToProps = {
  requestMessages: ChatCreators.requestGetCurrentChat,
  updateMessages: ChatCreators.updateCurrentMsg,
  updateMessagesState: ChatCreators.updateMessagesState,
  sendMessage: ChatCreators.requestSendMsg,
  readMessage: ChatCreators.requestReadMsg,
  requestOpenChat: ChatCreators.requestOpenChat,
  requestCloseChat: ChatCreators.requestCloseChat,
  readFlag: InboxCreators.requestReadFlag,
  blockUser: UserCreators.requestBlockUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSafeAreaInsets(Chat));
