export const textGradient = (
	direction: string,
	from: string,
	to: string,
	fallbackColor: string
) => `
	color: ${fallbackColor};
	@supports (-webkit-text-fill-color: transparent) and
		((-webkit-background-clip: text) or (background-clip: text)) {
		background: linear-gradient(${direction}, ${from}, ${to});
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
	}
`;
