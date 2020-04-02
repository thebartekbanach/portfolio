import { HelloWorldStyled } from "~/components/helloWorld.styles";
import { useTranslation } from "~/lib/i18next";

export const SomeContainer = () => {
	const { t, i18n } = useTranslation();

	return (
		<HelloWorldStyled>
			{t("hello-world")} | language: {i18n.language}, set:{" "}
			<button onClick={() => i18n.changeLanguage(i18n.language === "pl" ? "en" : "pl")}>
				{i18n.language === "pl" ? "en" : "pl"}
			</button>
		</HelloWorldStyled>
	);
};
