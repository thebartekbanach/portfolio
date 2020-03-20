import { all } from "redux-saga/effects";
import translationsSagas from "./translations/sagas";
import pageTranslationsSagas from "./pageTranslations/sagas";

function* rootSaga() {
	yield all([translationsSagas(), pageTranslationsSagas()]);
}

export default rootSaga;
