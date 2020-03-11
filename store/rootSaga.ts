import { all } from "redux-saga/effects";
import translationsSagas from "./translations/sagas";

function* rootSaga() {
	yield all([translationsSagas()]);
}

export default rootSaga;
