import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { applyMiddleware, createStore, Middleware } from "redux";

function bindMiddleware(middleware: Middleware[]) {
	if (process.env.NODE_ENV !== "production") {
		const { composeWithDevTools } = require("redux-devtools-extension");
		return composeWithDevTools(applyMiddleware(...middleware));
	}

	return applyMiddleware(...middleware);
}

export function configureStore(preloadedState, { isServer, req = null }) {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(rootReducer, preloadedState, bindMiddleware([sagaMiddleware]));

	const sagaTask = sagaMiddleware.run(rootSaga);

	if (req || !isServer) {
		return {
			...store,
			sagaTask
		};
	}

	return store;
}
