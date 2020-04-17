import { mountWithRedux, FakeStore } from "../mountWithRedux";
import { navbar } from "~/store/navbar";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

describe(FakeStore, () => {
	describe("getState", () => {
		it("should return correct state if initialized by constructor", () => {
			const state = {
				navbar: {
					mobileNavbarOpenState: true
				}
			};

			const fakeStore = new FakeStore(state);
			const result = fakeStore.getState();

			expect(result).toBe(state);
		});

		it("should return correct state if state is changed by setState", () => {
			const initialState = {
				navbar: {
					mobileNavbarOpenState: true
				}
			};

			const nextState = {
				navbar: {
					mobileNavbarOpenState: false
				}
			};

			const fakeStore = new FakeStore(initialState);
			fakeStore.setState(nextState);
			const result = fakeStore.getState();

			expect(result).toBe(nextState);
		});
	});

	describe("dispatch", () => {
		it("should save dispatched action in dispatchedActions array", () => {
			const action = navbar.actions.toggleMenuState();

			const fakeStore = new FakeStore({});
			fakeStore.dispatch(action);

			expect(fakeStore.dispatchedActions).toContain(action);
		});

		it("should call subscribers if action is dispatched", () => {
			const action = navbar.actions.toggleMenuState();
			const subscriber = jest.fn();

			const fakeStore = new FakeStore({});
			fakeStore.subscribe(subscriber);
			fakeStore.subscribe(subscriber);
			fakeStore.subscribe(subscriber);
			fakeStore.dispatch(action);

			expect(subscriber).toBeCalledTimes(3);
		});
	});

	describe("isActionDispatched", () => {
		it("should return true if specified action was dispatched", () => {
			const initialState = {
				navbar: {
					mobileNavbarOpenState: true
				}
			};
			const action = navbar.actions.internal.setMenuState(false);

			const fakeStore = new FakeStore(initialState);
			fakeStore.dispatch(action);

			expect(fakeStore.isActionDispatched(action)).toBe(true);
		});

		it("should return false is there is no equal action", () => {
			const action = navbar.actions.internal.setMenuState(false);
			const wrongAction = navbar.actions.toggleMenuState();

			const fakeStore = new FakeStore({});
			fakeStore.dispatch(action);

			expect(fakeStore.isActionDispatched(wrongAction)).toBe(false);
		});

		it("should return false if action parameters does not match", () => {
			const action = navbar.actions.internal.setMenuState(false);
			const wrongAction = navbar.actions.internal.setMenuState(true);

			const fakeStore = new FakeStore({});
			fakeStore.dispatch(action);

			expect(fakeStore.isActionDispatched(wrongAction)).toBe(false);
		});
	});

	describe("areActionsDispatched", () => {
		it("should return true if all specified actions were dispatched", () => {
			const actions = [
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(false),
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(true),
				navbar.actions.toggleMenuState()
			];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatched([
					navbar.actions.internal.setMenuState(true),
					navbar.actions.internal.setMenuState(false),
					navbar.actions.toggleMenuState()
				])
			).toBe(true);
		});

		it("should return false if some action is missing", () => {
			const actions = [navbar.actions.toggleMenuState(), navbar.actions.toggleMenuState()];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatched([
					navbar.actions.internal.setMenuState(true),
					navbar.actions.internal.setMenuState(false),
					navbar.actions.toggleMenuState()
				])
			).toBe(false);
		});

		it("should return false if action parameters are different", () => {
			const actions = [
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(false),
				navbar.actions.toggleMenuState()
			];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatched([
					navbar.actions.internal.setMenuState(true),
					navbar.actions.toggleMenuState()
				])
			).toBe(false);
		});
	});

	describe("areActionsDispatchedInExactOrder", () => {
		it("should return true if all actions are dispatched in exact order", () => {
			const actions = [
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(false),
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(true),
				navbar.actions.toggleMenuState()
			];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatchedInExactOrder([
					navbar.actions.toggleMenuState(),
					navbar.actions.internal.setMenuState(false),
					navbar.actions.toggleMenuState(),
					navbar.actions.internal.setMenuState(true),
					navbar.actions.toggleMenuState()
				])
			).toBe(true);
		});

		it("should return true if all actions are dispatched in exact order but with additional actions between expected", () => {
			const actions = [
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(false),
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(true),
				navbar.actions.toggleMenuState()
			];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatchedInExactOrder(
					[
						navbar.actions.internal.setMenuState(false),
						navbar.actions.internal.setMenuState(true)
					],
					{ allowAdditionalActionsBetweenSpecified: true }
				)
			).toBe(true);
		});

		it("should return false if some action is missing", () => {
			const actions = [
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(false),
				navbar.actions.toggleMenuState(),
				navbar.actions.toggleMenuState()
			];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatchedInExactOrder([
					navbar.actions.internal.setMenuState(false),
					navbar.actions.toggleMenuState(),
					navbar.actions.internal.setMenuState(true)
				])
			).toBe(false);
		});

		it("should return false if actions are not in order", () => {
			const actions = [
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(false),
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(true),
				navbar.actions.toggleMenuState()
			];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatchedInExactOrder([
					navbar.actions.internal.setMenuState(true),
					navbar.actions.toggleMenuState(),
					navbar.actions.internal.setMenuState(false)
				])
			).toBe(false);
		});

		it("should return false if some action parameters are not equal", () => {
			const actions = [
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(false),
				navbar.actions.toggleMenuState(),
				navbar.actions.internal.setMenuState(true),
				navbar.actions.toggleMenuState()
			];

			const fakeStore = new FakeStore({});
			actions.forEach(a => fakeStore.dispatch(a));

			expect(
				fakeStore.areActionsDispatchedInExactOrder([
					navbar.actions.internal.setMenuState(false),
					navbar.actions.toggleMenuState(),
					navbar.actions.internal.setMenuState(false)
				])
			).toBe(false);
		});
	});
});

describe(mountWithRedux, () => {
	it("should correctly render component using FakeStore", () => {
		const store = new FakeStore({
			navbar: {
				mobileNavbarOpenState: false
			}
		});

		const Component: FC = () => {
			const isMobileNavbarOpen = useSelector(navbar.selectors.isMobileNavbarOpen);
			const stateText = isMobileNavbarOpen ? "open" : "closed";

			return <div>{stateText}</div>;
		};

		const result = mountWithRedux(store, <Component />);

		expect(result.contains(<div>closed</div>));
	});

	it("should correctly dispatch action to FakeStore", () => {
		const store = new FakeStore({});
		const action = { type: "some action" };

		const Component: FC = () => {
			const dispatch = useDispatch();

			return (
				<div>
					<button className="btn" onClick={() => dispatch(action)}>
						Some button
					</button>
				</div>
			);
		};

		const result = mountWithRedux(store, <Component />);
		result.find("button").simulate("click");

		expect(store.isActionDispatched(action)).toBe(true);
	});
});
