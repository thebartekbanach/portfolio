import { DeepPartial, Store, AnyAction, Observer } from "redux";
import { State } from "~/store";
import deepEqual from "deep-equal";
import { shallow, ShallowRendererProps, mount } from "enzyme";
import { Provider } from "react-redux";
import { Reducer, ReactElement } from "react";
import { Unsubscribe } from "redux-saga";

type Dispatch = <T>(action: T) => T;

export class FakeStore {
	private state: DeepPartial<State> = {};
	private subscribers: (() => void)[] = [];
	public dispatchedActions: unknown[] = [];

	constructor(initialState: DeepPartial<State>) {
		this.state = initialState;
	}

	setState(state: DeepPartial<State>) {
		this.state = state;
	}

	[Symbol.observable] = () => ({
		subscribe: (observer: Observer<any>) => ({
			unsubscribe: this.subscribe((observer.next as unknown) as () => void)
		}),
		[Symbol.observable]() {
			return this;
		}
	});

	replaceReducer = (nextReducer: Reducer<unknown, AnyAction>) => {
		const message = `You are trying to replaceReducer on FakeStore with: ${nextReducer} this method is not implemented`;
		console.warn(message);
		throw new Error(message);
	};

	dispatch = (action => {
		this.dispatchedActions.push(action);

		for (const subscriber of this.subscribers) {
			subscriber();
		}

		return action;
	}) as Dispatch;

	getState = () => this.state;

	subscribe = (listener: () => void): Unsubscribe => {
		this.subscribers.push(listener);

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => {};
	};

	areActionsDispatchedInExactOrder(
		actions: unknown[],
		options = { allowAdditionalActionsBetweenSpecified: true }
	) {
		for (let dispatchedId = 0, expectedId = 0; dispatchedId < this.dispatchedActions.length; ) {
			if (deepEqual(this.dispatchedActions[dispatchedId], actions[expectedId])) {
				dispatchedId++;
				expectedId++;

				if (expectedId >= actions.length) {
					return true;
				}
			} else if (options.allowAdditionalActionsBetweenSpecified) {
				dispatchedId++;
			} else {
				return false;
			}
		}

		return false;
	}

	areActionsDispatched(actions: unknown[]) {
		for (const action of actions) {
			if (!this.isActionDispatched(action)) {
				return false;
			}
		}

		return true;
	}

	isActionDispatched(action: unknown) {
		return this.dispatchedActions.findIndex(item => deepEqual(item, action)) !== -1;
	}
}

export function mountWithRedux(store: Store, node: ReactElement, options?: ShallowRendererProps) {
	const tree = <Provider store={store}>{node}</Provider>;
	return mount(tree, options);
}