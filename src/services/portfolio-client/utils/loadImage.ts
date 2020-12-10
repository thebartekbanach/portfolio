export const loadImage = (src: string) =>
	new Promise((resolve, reject) => {
		const loader = new Image();

		loader.onload = resolve;
		loader.onerror = reject;

		loader.src = src;
	});
