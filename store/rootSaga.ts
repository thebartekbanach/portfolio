import { all } from "redux-saga/effects";
import { navbarWatchSaga } from "./navbar/sagas";

export default function* rootSaga() {
	yield all([navbarWatchSaga()]);
}
