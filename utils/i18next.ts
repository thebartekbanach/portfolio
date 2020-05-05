import NextI18Next from "next-i18next";
import { channel } from "redux-saga";

const i18nextInstance = new NextI18Next({
	defaultLanguage: "en",
	otherLanguages: ["pl"],
	defaultNS: "common",
	localePath: typeof window === "undefined" ? "public/locales" : "locales"
});

export default i18nextInstance;

export const { appWithTranslation, useTranslation, i18n } = i18nextInstance;

export const languageChangeChannel = channel<string>();
i18nextInstance.i18n.on("languageChanged", languageChangeChannel.put);

export const getObjectFromTranslations = (namespace: string) => {
	i18nextInstance.i18n.t(namespace, { returnObjects: true });
};
