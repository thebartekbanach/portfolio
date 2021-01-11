/* eslint-disable @typescript-eslint/no-var-requires */
import NextI18Next, { I18n } from "next-i18next";

const i18nextInstance = new NextI18Next({
	localeSubpaths: require("next/config").default().publicRuntimeConfig.localeSubpaths,
	defaultLanguage: "pl",
	otherLanguages: ["en"],
	defaultNS: "common",
	localePath:
		typeof window === "undefined" ? require("path").resolve("public/locales") : "/locales"
});

if (process.env.NODE_ENV !== "production") {
	if (process.browser) {
		const { applyClientHMR } = require("i18next-hmr/client");
		applyClientHMR(i18nextInstance.i18n);
	} else {
		const { applyServerHMR } = require("i18next-hmr/server");
		applyServerHMR(i18nextInstance.i18n);
	}
}

export default i18nextInstance;

export const { appWithTranslation, useTranslation, i18n, Link, Router } = i18nextInstance;

export const getObjectFromTranslations = <T = unknown>(i18n: I18n, namespace: string) =>
	(i18n.t(namespace, { returnObjects: true }) as unknown) as T;
