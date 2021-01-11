import { promises as fs } from "fs";

import marked from "marked";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { I18n } from "next-i18next";

import { PageHead } from "~/components/layout/head";
import { PageContainer } from "~/components/layout/pageContainer";
import { RealizationInfo, RealizationPageContent } from "~/components/pages/realization";

interface RealizationPageProps {
	realizationInfo: RealizationInfo | null;
	realizationContent: string | null;
}

const RealizationPage: NextPage<RealizationPageProps> = ({
	realizationInfo,
	realizationContent
}) => {
	if (realizationInfo === null || realizationContent === null) {
		return (
			<>
				<PageHead pageTitle="Bartek Banach - realizacje" description="TODO" />
				<PageContainer>
					<h1>Page not found</h1>
				</PageContainer>
			</>
		);
	}

	return (
		<>
			<PageHead pageTitle="Bartek Banach - realizacje" description="TODO" />
			<PageContainer>
				<RealizationPageContent
					realizationInfo={realizationInfo}
					realizationContent={realizationContent}
				/>
			</PageContainer>
		</>
	);
};

const realizationNotFound = { realizationInfo: null, realizationContent: null };

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
		return { props: { realizationInfo: info, realizationContent: renderedContent } };
	} catch (err) {
		return { props: realizationNotFound };
	}
};

export default RealizationPage;
