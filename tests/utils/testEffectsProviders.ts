import { State } from "~/store";
import deepEqual from "deep-equal";

export const select = (selectorFunc: (store: State) => unknown) => ({
	mockedBy: (mock: jest.Mock) => ({
		select({ selector }: { selector: Function }, next: Function) {
			if (selectorFunc === selector) {
				return mock();
			}

			return next();
		}
	}),
	usingNameMockedBy: (mock: jest.Mock) => ({
		select({ selector }: { selector: Function }, next: Function) {
			if (selectorFunc.name === selector.name) {
				return mock();
			}
			return next();
		}
	})
});

type Parameters<T> = T extends (...args: infer T) => unknown ? T : never;

export const call = <Fn extends (...args: unknown[]) => unknown>(
	callFunc: Fn,
	...params: Parameters<Fn>
) => ({
	mockedBy: (mock: jest.Mock) => ({
		call(effect: { fn: Function; args: unknown[] }, next: Function) {
			if (effect.fn === callFunc && deepEqual(effect.args, params)) {
				return mock();
			}

			return next();
		}
	})
});

export const race = <T>(raceConfig: T) => ({
	mockedBy: (mock: jest.Mock) => ({
		race(raceCallParams: T | unknown, next: Function) {
			if (deepEqual(raceCallParams, raceConfig)) {
				return mock();
			}

			return next();
		}
	})
});

type TakeParams<T> = {
	pattern?: T | unknown;
	channel?: T | unknown;
};

export const take = <T>(takeConfig: T) => ({
	mockedBy: (mock: jest.Mock) => ({
		take(call: TakeParams<T>, next: Function) {
			if (call.pattern) {
				const { pattern: takeCallParams } = call;

				if (Array.isArray(takeConfig)) {
					if (
						!Array.isArray(takeCallParams) ||
						takeConfig.length !== takeCallParams.length
					) {
						return next();
					}

					for (const item of takeConfig) {
						if (takeCallParams.findIndex(i => i === item) === -1) {
							return next();
						}
					}

					return mock();
				}

				if (deepEqual(takeCallParams, takeConfig)) {
					return mock();
				}
			} else if (call.channel) {
				if (call.channel === takeConfig) {
					return mock();
				}
			}

			return next();
		}
	})
});
