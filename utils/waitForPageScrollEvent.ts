export const waitForPageScrollEvent = () =>
	new Promise<true>(resolve => {
		const resolveOnPageScroll = () => {
			window.removeEventListener("scroll", resolveOnPageScroll);
			resolve(true);
		};

		window.addEventListener("scroll", resolveOnPageScroll);
	});
