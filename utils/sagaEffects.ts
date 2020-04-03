/*
 * Why did I need to export all of saga effects in this way?
 * Because:
 * - I wanted to have at least minimum effects typing from redux-saga package,
 *	which is done using typed-redux-saga package exported effects,
 * - I wanted to be able to test it all with redux-saga-test-plan
 *	package.
 *
 * Unfortunately redux-saga-test-plan package race matchers
 * does not want to work with typed-redux-saga
 * call, take and delay inside race effect.
 *
 * And because of it I needed to export all packages manually,
 * that means to leave all typed-redux-saga exports excluding race
 * which I changed to object below.
 *
 * race.fn is race effect exported from redux-saga/effects.
 * race.call is clear call effect exported from redux-saga/effects;
 * race.take is take effect exported from redux-saga/effects;
 *
 * And we are exporting also delay effect from redux-saga/effects,
 * because this also does not want to work with redux-saga-test-plan
 * inside race effect and we do not need it to be statically typed.
 *
 */

export * from "typed-redux-saga";
import { race as typedRace } from "typed-redux-saga";
import { call, take, delay } from "redux-saga/effects";

const race = {
	fn: typedRace,
	call,
	take
};

export { race, delay };
