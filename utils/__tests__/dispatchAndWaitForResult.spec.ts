import { dispatchAndWaitForResult } from "../dispatchAndWaitForResult";
import { FakeStore } from "~/tests/utils/mountWithRedux";

describe(dispatchAndWaitForResult, () => {
	it("should resolve if specified state is ocurred", async () => {
		const fakeStore = new FakeStore({ isServerSideReady: false });
		const action = { type: "initializeStore" };
		fakeStore.updateStateIfActionIsDispatched(action, { isServerSideReady: true });

		await dispatchAndWaitForResult(
			fakeStore.asStore(),
			action,
			state => state.isServerSideReady
		);

		expect(fakeStore.isActionDispatched(action)).toBeTruthy();
	});

	it("should reject a promise if timeout is ocurred", async () => {
		const fakeStore = new FakeStore({ isServerSideReady: false });
		const action = { type: "initializeStore" };

		await expect(
			dispatchAndWaitForResult(
				fakeStore.asStore(),
				action,
				state => state.isServerSideReady,
				20
			)
		).rejects.toThrowError(`dispatchAndWaitForResult: Timeout of "initializeStore" action`);
	});

	it("should not call reject after resolve", async () => {
		const fakeStore = new FakeStore({ isServerSideReady: false });
		const action = { type: "initializeStore" };
		fakeStore.updateStateIfActionIsDispatched(action, { isServerSideReady: true });

		await dispatchAndWaitForResult(
			fakeStore.asStore(),
			action,
			state => state.isServerSideReady
		);

		expect(fakeStore.isActionDispatched(action)).toBeTruthy();
	});
});
