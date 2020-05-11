import { Store, Action } from "redux";

export function dispatchAndWaitForResult<TState>(
	store: Store<TState>,
	action: Action,
	resultCheckFunction: (state: TState) => boolean,
	timeoutTime = 2000
) {
	return new Promise<void>((resolve, reject) => {
		let timeout: number | undefined = undefined;

		const unsubscribe = store.subscribe(() => {
			if (resultCheckFunction(store.getState())) {
				clearTimeout(timeout);
				unsubscribe();
				resolve();
			}
		});

		timeout = setTimeout(() => {
			unsubscribe();
			reject(new Error(`dispatchAndWaitForResult: Timeout of "${action.type}" action`));
		}, timeoutTime);
		store.dispatch(action);
	});
}
