export const getScrollPosition = () => {
	const element = document.documentElement.clientHeight
		? document.documentElement
		: document.body;
	return element.scrollTop;
};

export const scrollToTop = () =>
	new Promise<true>((resolve, reject) => {
		if (getScrollPosition() === 0) {
			resolve(true);
		}

		const scrollTimeout = setTimeout(reject, 2000);

		const resolveIfReady = () => {
			if (getScrollPosition() === 0) {
				window.removeEventListener("scroll", resolveIfReady);
				clearTimeout(scrollTimeout);
				resolve(true);
			}
		};

		window.addEventListener("scroll", resolveIfReady);
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	});
