import styled from "styled-components";
import { PageHead } from "~/components/layout/head";
import { useTranslation } from "~/utils/i18next";
import { useFont } from "~/utils/useFont";

const StyledFontExample = styled.li<{ font: any }>`
	${p => p.font};
`;

const IndexPage = () => {
	const [t, i18n] = useTranslation();

	return (
		<>
			<PageHead pageTitle="Bartek Banach - portfolio" description="TODO" />
			<div>
				<h1>{t("hello-world")}, its a font test:</h1>
				<ul>
					<StyledFontExample font={useFont.montserrat.bold}>
						Montserrat bold
					</StyledFontExample>
					<StyledFontExample font={useFont.montserrat.extraBold}>
						Montserrat extra-bold
					</StyledFontExample>
					<StyledFontExample font={useFont.nunitoSans.regular}>
						Nunito Sans regular
					</StyledFontExample>
					<StyledFontExample font={useFont.nunitoSans.semiBold}>
						Nunito Sans semi-bold
					</StyledFontExample>
					<StyledFontExample font={useFont.nunitoSans.bold}>
						Nunito Sans bold
					</StyledFontExample>
					<StyledFontExample font={useFont.nunitoSans.extraBold}>
						Nunito Sans extra-bold
					</StyledFontExample>
					<StyledFontExample font={useFont.roboto.regular}>
						Roboto regular
					</StyledFontExample>
					<StyledFontExample font={useFont.roboto.medium}>
						Roboto medium
					</StyledFontExample>
					<StyledFontExample font={useFont.roboto.bold}>Roboto bold</StyledFontExample>
				</ul>
				<div>
					Current language:
					{i18n.language}
					<br />
					<button
						onClick={() => i18n.changeLanguage(i18n.language === "en" ? "pl" : "en")}
					>
						Change to {i18n.language === "en" ? "pl" : "en"}
					</button>
				</div>
			</div>
		</>
	);
};

export default IndexPage;
