import { call, put, takeLatest } from "redux-saga/effects";
import { SearchCreators, SearchTypes } from "../actions";
import { search } from "@redux/api";

export function* watchSearchRequests() {
  yield takeLatest(SearchTypes.REQUEST_SEARCH, requestSearch);
}

function* requestSearch(action) {
  try {
    const { keyword, token } = action;

    const params = new FormData();
    params.append("search", keyword);

    const response = yield call(search, params, token);

    yield put(SearchCreators.searchSuccess(response.data.data.all));
  } catch (error) {
    yield put(SearchCreators.searchFailure());
  }
}
