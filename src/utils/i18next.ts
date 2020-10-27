/* eslint-disable @typescript-eslint/no-var-requires */
import NextI18Next, { I18n } from "next-i18next";

const i18nextInstance = new NextI18Next({
	localeSubpaths: require("next/config").default().publicRuntimeConfig.localeSubpaths,
	defaultLanguage: "en",
	otherLanguages: ["pl"],

	defaultNS: "common",
	localePath:
		typeof window === "undefined" ? require("path").resolve("public/locales") : "locales"
});

export default i18nextInstance;

export const { appWithTranslation, useTranslation, i18n } = i18nextInstance;

export const getObjectFromTranslations = <T = unknown>(i18n: I18n, namespace: string) =>
	(i18n.t(namespace, { returnObjects: true }) as unknown) as T;
