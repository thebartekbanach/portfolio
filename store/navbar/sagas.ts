import { takeLeading, put, select, delay, call, race, spawn } from "~/utils/sagaEffects";
import { navbar } from ".";
import { scrollToTop } from "~/utils/scrollToTop";
import { waitForPageScrollEvent } from "~/utils/waitForPageScrollEvent";

export function* hideMenuOnScroll() {
	const { scrolled } = yield* race.fn({
		toggled: race.take(navbar.actions.toggleMenuState),
		scrolled: race.call(waitForPageScrollEvent)
	});

	if (scrolled) {
		yield* put(navbar.actions.internal.setMenuState(false));
	}
}

export function* toggleMenuSaga() {
	yield* call(scrollToTop);

	const isMobileNavbarOpen = yield* select(navbar.selectors.isMobileNavbarOpen);
	yield* put(navbar.actions.internal.setMenuState(!isMobileNavbarOpen));

	yield delay(navbar.constants.mobileNavigationMenuToggleTime);

	if (!isMobileNavbarOpen) {
		yield* spawn(hideMenuOnScroll);
	}
}

export function* navbarWatchSaga() {
	yield* takeLeading(navbar.actions.toggleMenuState, toggleMenuSaga);
}
