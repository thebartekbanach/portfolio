import { Store } from "~/store";
import deepEqual from "deep-equal";

export const select = (selectorFunc: (store: Store) => unknown) => ({
	mockedBy: (mock: jest.Mock) => ({
		select({ selector }: { selector: Function }, next: Function) {
			if (selectorFunc === selector) {
				return mock();
			}

			return next();
		}
	})
});

type Parameters<T> = T extends (...args: infer T) => any ? T : never;

export const call = <Fn extends (...args: any[]) => any>(
	callFunc: Fn,
	...params: Parameters<Fn>
) => ({
	mockedBy: (mock: jest.Mock) => ({
		call(effect: { fn: Function; args: any[] }, next: Function) {
			if (effect.fn === callFunc && deepEqual(effect.args, params)) {
				return mock();
			}

			return next();
		}
	})
});

export const race = <T>(raceConfig: T) => ({
	mockedBy: (mock: jest.Mock) => ({
		race(raceCallParams: T | any, next: Function) {
			if (deepEqual(raceCallParams, raceConfig)) {
				return mock();
			}

			return next();
		}
	})
});
