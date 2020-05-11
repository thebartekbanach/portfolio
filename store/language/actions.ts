import { createActionCreator } from "deox";

export const setupLanguageOnServerSide = createActionCreator(
	"language/setupLanguageOnServerSide",
	resolve => (langCode: string) => resolve({ langCode })
);
