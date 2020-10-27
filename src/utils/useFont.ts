import { css } from "styled-components";

const font = (name: string, fallbacks: string[]) => (weight: string) => {
	return css`
		font-family: ${`${name}_${weight}`}, ${fallbacks.join(", ")};
		font-weight: normal;
		font-style: normal;
	`;
};

const montserratFont = font("montserrat", ["sans-serif"]);
const nunitoSansFont = font("nunito-sans", ["sans-serif"]);
const robotoFont = font("roboto", ["sans-serif"]);

export const useFont = {
	montserrat: {
		bold: montserratFont("bold"),
		extraBold: montserratFont("extra-bold")
	},
	nunitoSans: {
		regular: nunitoSansFont("regular"),
		semiBold: nunitoSansFont("semi-bold"),
		bold: nunitoSansFont("bold"),
		extraBold: nunitoSansFont("extra-bold")
	},
	roboto: {
		regular: robotoFont("regular"),
		medium: robotoFont("medium"),
		bold: robotoFont("bold")
	}
};
