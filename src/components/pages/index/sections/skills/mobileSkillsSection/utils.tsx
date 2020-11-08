import debounce from "lodash.debounce";

const scrollBy = (top: number, abortAfterTimeMs = 1500) =>
	new Promise((resolve, reject) => {
		const abortTimeoutId = setTimeout(() => {
			window.removeEventListener("scroll", scrollEventHandler, eventOptions);
			reject("scrollBy aborted due to scroll end timeout");
		}, abortAfterTimeMs);

		const scrollEventHandler = debounce(() => {
			clearTimeout(abortTimeoutId);
			resolve();
		}, 100);

		const eventOptions: AddEventListenerOptions = { passive: true };

		window.addEventListener("scroll", scrollEventHandler, eventOptions);

		window.scrollBy({
			behavior: "smooth",
			top
		});
	});

export class StickGuard {
	private target: (EventTarget & Element) | null = null;
	private offsetTop = 0;

	private guardScrollPosition = () => {
		if (this.target === null) {
			return;
		}

		const position = this.target.getBoundingClientRect().top - this.offsetTop;
		window.scrollBy({ left: 0, top: position });

		window.requestAnimationFrame(this.guardScrollPosition);
	};

	stickTo(target: EventTarget & Element, offsetTop = 0) {
		this.target = target;
		this.offsetTop = offsetTop;

		this.guardScrollPosition();
	}

	async scrollToAndStick(target: EventTarget & Element, offsetTop = 0) {
		const position = target.getBoundingClientRect().top - offsetTop;

		if (position > 1 || position < -1) {
			await scrollBy(position);
		}

		this.stickTo(target, offsetTop);
	}

	stopSticking() {
		this.target = null;
	}
}
