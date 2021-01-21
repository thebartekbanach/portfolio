import { promises as fs } from "fs";

import marked from "marked";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { I18n } from "next-i18next";
import DefaultErrorPage from "next/error";

import { PageHead } from "~/components/layout/head";
import { PageContainer } from "~/components/layout/pageContainer";
import { RealizationInfo, RealizationPageContent } from "~/components/pages/realization";
import { useTranslation } from "~/utils/i18next";

interface RealizationPageProps {
	realizationInfo: RealizationInfo | null;
	realizationContent: string | null;
	lang: string;
}

const RealizationPage: NextPage<RealizationPageProps> = ({
	realizationInfo,
	realizationContent,
	lang
}) => {
	const [t] = useTranslation("realizationPage");

	if (realizationInfo !== null && realizationContent !== null) {
		pageContent = (

	return (
		<>
			<PageHead
				pageTitle={t("pageMeta.pageTitle", {
					replace: { realizationName: realizationInfo?.title }
				})}
				description={realizationContent}
				coverImage={realizationInfo.previewPicture}
			/>
			<PageContainer>
				<RealizationPageContent
					lang={lang}
					realizationInfo={realizationInfo}
					realizationContent={realizationContent}
				/>
			</PageContainer>
		</>
	);
};

type GetServerSidePropsContextWithI18n = GetServerSidePropsContext & { req?: { i18n: I18n } };

export const getServerSideProps: GetServerSideProps<RealizationPageProps> = async (
	ctx: GetServerSidePropsContextWithI18n
) => {
	const id = ctx.query.id as string;
	const lang = ctx.req.i18n.language;
	const cwd = process.cwd();

	try {
		const rawInfo = await fs.readFile(
			`${cwd}/public/locales/${lang}/realizations/${id}.json`,
			"utf-8"
		);
		const info = JSON.parse(rawInfo) as RealizationInfo;

		const rawContent = await fs.readFile(`${cwd}/public` + info.contentUrl, "utf-8");
		const renderedContent = marked(rawContent);
		return { props: { realizationInfo: info, realizationContent: renderedContent, lang } };
	} catch (err) {
		return { props: { realizationInfo: null, realizationContent: null, lang } };
	}
};

export default RealizationPage;
