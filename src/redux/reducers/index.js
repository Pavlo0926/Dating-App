import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

import regitrationReducer from "./registration.reducer";
import userReducer from "./user.reducer";
import inboxReducer from "./inbox.reducer";
import swipeReducer from "./swipe.reducer";
import searchReducer from "./search.reducer";
import chatReducer from "./chat.reducer";
import liveReducer from "./live.reducer";

const rootReducer = combineReducers({
  registration: regitrationReducer,
  user: userReducer,
  live: liveReducer,
  inbox: inboxReducer,
  chat: chatReducer,
  swipe: swipeReducer,
  search: searchReducer,
  form: formReducer,
});

export default rootReducer;
