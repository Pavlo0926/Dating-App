import { all } from "redux-saga/effects";
import { watchUserRequests } from "./user.sagas";
import { watchInboxRequests } from "./inbox.sagas";
import { watchSwipeRequests } from "./swipe.sagas";
import { watchSearchRequests } from "./search.sagas";
import { watchChatRequests } from "./chat.sagas";
import { watchLiveRequests } from "./live.sagas";

export function* rootSaga() {
  yield all([
    watchUserRequests(),
    watchInboxRequests(),
    watchSwipeRequests(),
    watchSearchRequests(),
    watchChatRequests(),
    watchLiveRequests(),
  ]);
}
