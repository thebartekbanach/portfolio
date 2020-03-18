import { Store } from "~/store";

export const select = <T>(selectorFunc: (store: Store) => T, mock: jest.Mock<T>) => ({
	select({ selector }: { selector: Function }, next: () => any) {
		if (selectorFunc === selector) {
			return mock();
		}

		return next();
	}
});
