import { PageTranslations } from "~/store/pageTranslations/models";

function fetchPageContents(languageCode: string): PageTranslations {
	return {} as PageTranslations;
}

export const pageContentsApi = {
	fetchPageContents
};
