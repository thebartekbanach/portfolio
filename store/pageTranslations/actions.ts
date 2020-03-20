import { createActionCreator } from "deox";
import { PageTranslations } from "./models";

export const pageTranslationsFetched = createActionCreator(
	"pageTranslations/pageTranslationsFetched",
	resolve => (languageCode: string, translations: PageTranslations) =>
		resolve({ languageCode, translations })
);
