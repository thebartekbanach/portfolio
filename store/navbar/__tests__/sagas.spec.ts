import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as match from "redux-saga-test-plan/matchers";
import { race } from "~/utils/sagaEffects";
import { hideMenuOnScroll, toggleMenuSaga, navbarWatchSaga } from "../sagas";
import { navbar } from "..";
import { waitForPageScrollEvent } from "~/utils/waitForPageScrollEvent";
import { scrollToTop, getScrollPosition } from "~/utils/scrollToTop";

describe(hideMenuOnScroll, () => {
	it("should hide menu if page scroll down is detected", () => {
		return expectSaga(hideMenuOnScroll)
			.provide([
				[
					match.race({
						toggled: race.take(navbar.actions.toggleMenuState),
						scrolled: race.call(waitForPageScrollEvent)
					}),
					{ toggled: undefined, scrolled: true }
				]
			])
			.put(navbar.actions.internal.setMenuState(false))
			.run();
	});

	it("should do nothing if menu is toggled by user", () => {
		return expectSaga(hideMenuOnScroll)
			.provide([
				[
					match.race({
						toggled: race.take(navbar.actions.toggleMenuState),
						scrolled: race.call(waitForPageScrollEvent)
					}),
					{ toggled: navbar.actions.toggleMenuState(), scrolled: undefined }
				]
			])
			.not.put(navbar.actions.internal.setMenuState(false))
			.run();
	});
});

describe(toggleMenuSaga, () => {
	it("should toggle menu on", () => {
		return expectSaga(toggleMenuSaga)
			.provide([
				[match.call(scrollToTop), true],
				[match.select(navbar.selectors.isMobileNavbarOpen), false],
				[match.spawn(hideMenuOnScroll), undefined]
			])
			.call(scrollToTop)
			.delay(navbar.constants.mobileNavigationMenuToggleTime)
			.put(navbar.actions.internal.setMenuState(true))
			.spawn(hideMenuOnScroll)
			.run(navbar.constants.mobileNavigationMenuToggleTime + 100);
	});

	it("should toggle menu off", () => {
		return expectSaga(toggleMenuSaga)
			.provide([
				[match.call(scrollToTop), true],
				[match.select(navbar.selectors.isMobileNavbarOpen), true]
			])
			.call(scrollToTop)
			.delay(navbar.constants.mobileNavigationMenuToggleTime)
			.put(navbar.actions.internal.setMenuState(false))
			.not.spawn(hideMenuOnScroll)
			.run(navbar.constants.mobileNavigationMenuToggleTime + 100);
	});

	it("should toggle menu off if page was scrolled until show animation", () => {
		return expectSaga(toggleMenuSaga)
			.provide([
				[match.call(scrollToTop), true],
				[match.select(navbar.selectors.isMobileNavbarOpen), false],
				[match.call(getScrollPosition), 69]
			])
			.call(scrollToTop)
			.put(navbar.actions.internal.setMenuState(true))
			.delay(navbar.constants.mobileNavigationMenuToggleTime)
			.call(getScrollPosition)
			.put(navbar.actions.internal.setMenuState(false))
			.not.spawn(hideMenuOnScroll)
			.run(navbar.constants.mobileNavigationMenuToggleTime + 100);
	});
});

describe(navbarWatchSaga, () => {
	it("should takeLeading action and set callback to toggleMenuSaga", () => {
		testSaga(navbarWatchSaga)
			.next()
			.takeLeading(navbar.actions.toggleMenuState, toggleMenuSaga)
			.finish()
			.isDone();
	});
});
