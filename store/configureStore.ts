import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { applyMiddleware, createStore, Middleware } from "redux";
import { MakeStoreOptions } from "next-redux-wrapper";
import { Store } from ".";

function bindMiddleware(middleware: Middleware[]) {
	if (process.env.NODE_ENV !== "production") {
		const { composeWithDevTools } = require("redux-devtools-extension");
		return composeWithDevTools(applyMiddleware(...middleware));
	}

	return applyMiddleware(...middleware);
}

export function configureStore(preloadedState: Store, { isServer, req = null }: MakeStoreOptions) {
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
