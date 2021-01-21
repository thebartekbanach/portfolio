import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { favicon } from "./favicon";
import { facebookMeta } from "./meta/facebook";
import { googleMeta } from "./meta/google";

export interface PageHeadProps {
	pageTitle: string;
	description: string;
	url?: string;
	locale?: string;
	coverImage?: string;
}

export const PageHead: FC<PageHeadProps> = props => {
	const [t] = useTranslation("pageMeta");
	const router = useRouter();

	const pageProps = { ...props };

	pageProps.url = pageProps.url ?? "https://bartekbanach.dev" + router.asPath;
	pageProps.locale = pageProps.locale ?? t("facebook.locale");
	pageProps.coverImage = pageProps.coverImage ?? t("facebook.coverImage");

	if (pageProps.coverImage?.charAt(0) === "/") {
		pageProps.coverImage = "https://bartekbanach.dev" + pageProps.coverImage;
	}

	return (
		<Head>
			<title>{pageProps.pageTitle}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta name="theme-color" content="#5f55f7" />
			<meta name="apple-mobile-web-app-status-bar-style" content="#5f55f7" />
			{favicon()}
			{googleMeta(pageProps)}
			{facebookMeta(pageProps)}
		</Head>
	);
};
