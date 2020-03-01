import { all } from "redux-saga/effects";
import { watchIncrementAsync } from "./counter/sagas";

function* rootSaga() {
	yield all([watchIncrementAsync()]);
}

export default rootSaga;
