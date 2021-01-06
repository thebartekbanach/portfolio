export const scrollToElement = (element: Element) => {
	if (element === null) {
		throw new Error(`Cannot smoothly scroll to null element`);
	}

	const offset = parseInt(element.getAttribute("data-smooth-scroll-offset") ?? "0");
	const scrollPosition = element.getBoundingClientRect().top - offset;

	window.scrollTo({ behavior: "smooth", left: 0, top: scrollPosition });
};
