import NextI18Next from "next-i18next";

const i18nextInstance = new NextI18Next({
	defaultLanguage: "en",
	otherLanguages: ["pl"],
	defaultNS: "common"
});

export default i18nextInstance;

export const { appWithTranslation, useTranslation } = i18nextInstance;
