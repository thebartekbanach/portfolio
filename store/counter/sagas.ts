import { call, put, takeEvery } from "redux-saga/effects";
import { counterActions } from "./actions";
import { getType } from "deox";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function* incrementAsync() {
	yield call(delay, 1000);
	yield put(counterActions.incrementAsync.success());
}

export function* watchIncrementAsync() {
	yield takeEvery(getType(counterActions.incrementAsync.request), incrementAsync);
}
