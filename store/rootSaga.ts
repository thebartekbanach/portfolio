import { all } from "redux-saga/effects";
import { imagesWatchSaga } from "./images/sagas";
import { navbarWatchSaga } from "./navbar/sagas";

export default function* rootSaga() {
	yield all([imagesWatchSaga(), navbarWatchSaga()]);
}
