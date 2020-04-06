import { createGlobalStyle } from "styled-components";

export const FontsImport = createGlobalStyle`
	@font-face {
		font-family: nunito-sans;
		src:
			url("fonts/nunito-sans/regular/font.ttf") format("truetype"),
			url("fonts/nunito-sans/regular/font.woff") format("woff"),
			url("fonts/nunito-sans/regular/font.woff2") format("woff2");
		font-weight: 300;
		font-style: normal;
	}

	@font-face {
		font-family: nunito-sans;
		src:
			url("fonts/nunito-sans/semi-bold/font.ttf") format("truetype"),
			url("fonts/nunito-sans/semi-bold/font.woff") format("woff"),
			url("fonts/nunito-sans/semi-bold/font.woff2") format("woff2");
		font-weight: 600;
		font-style: normal;
	}

	@font-face {
		font-family: nunito-sans;
		src:
			url("fonts/nunito-sans/bold/font.ttf") format("truetype"),
			url("fonts/nunito-sans/bold/font.woff") format("woff"),
			url("fonts/nunito-sans/bold/font.woff2") format("woff2");
		font-weight: 800;
		font-style: normal;
	}
`;

export const fonts = {
	nunitoSans: "nunito-sans, sans-serif"
};
