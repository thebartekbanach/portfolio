import { createGlobalStyle } from "styled-components";

export const FontsImport = createGlobalStyle`
	/* nunito-sans */

	@font-face {
		font-family: nunito-sans-regular;
		src:
			url("fonts/nunito-sans/regular/font.ttf") format("truetype"),
			url("fonts/nunito-sans/regular/font.woff") format("woff"),
			url("fonts/nunito-sans/regular/font.woff2") format("woff2");
	}

	@font-face {
		font-family: nunito-sans-semi-bold;
		src:
			url("fonts/nunito-sans/semi-bold/font.ttf") format("truetype"),
			url("fonts/nunito-sans/semi-bold/font.woff") format("woff"),
			url("fonts/nunito-sans/semi-bold/font.woff2") format("woff2");
	}

	@font-face {
		font-family: nunito-sans-bold;
		src:
			url("fonts/nunito-sans/bold/font.ttf") format("truetype"),
			url("fonts/nunito-sans/bold/font.woff") format("woff"),
			url("fonts/nunito-sans/bold/font.woff2") format("woff2");
	}

	@font-face {
		font-family: nunito-sans-extra-bold;
		src:
			url("fonts/nunito-sans/extra-bold/font.ttf") format("truetype"),
			url("fonts/nunito-sans/extra-bold/font.woff") format("woff"),
			url("fonts/nunito-sans/extra-bold/font.woff2") format("woff2");
	}

	/* montserrat */

	@font-face {
		font-family: montserrat-extra-bold;
		src:
			url("fonts/montserrat/extra-bold/font.ttf") format("truetype"),
			url("fonts/montserrat/extra-bold/font.woff") format("woff"),
			url("fonts/montserrat/extra-bold/font.woff2") format("woff2");
	}
`;

export const useFont = {
	nunitoSans: {
		regular: "font-family: nunito-sans-regular, sans-serif; font-weight: 400;",
		semiBold: "font-family: nunito-sans-semi-bold, sans-serif; font-weight: 500;",
		bold: "font-family: nunito-sans-bold, sans-serif; font-weight: 600;",
		extraBold: "font-family: nunito-sans-extra-bold, sans-serif; font-weight: 800;"
	},
	montserrat: {
		extraBold: "font-family: montserrat-extra-bold, sans-serif; font-weight: 800;"
	}
};
