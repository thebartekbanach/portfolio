import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { Middleware, applyMiddleware, createStore } from "redux";
import { State } from ".";

function bindMiddleware(middleware: Middleware[]) {
	if (process.env.NODE_ENV !== "production") {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { composeWithDevTools } = require("redux-devtools-extension");
		return composeWithDevTools(applyMiddleware(...middleware));
	}

	return applyMiddleware(...middleware);
}

export function configureStore(preloadedState: State) {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(rootReducer, preloadedState, bindMiddleware([sagaMiddleware]));

	const sagaTask = sagaMiddleware.run(rootSaga);

	return {
		...store,
		sagaTask
	};
}
