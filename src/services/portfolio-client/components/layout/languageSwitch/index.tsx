import { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { AvailableLanguage, LanguageSwitchWrapper } from "./styles";

interface LanguageSwitchProps {
	hidePage(): Promise<void>;
	showPage(): Promise<void>;
}

export const LanguageSwitch: FC<LanguageSwitchProps> = ({ hidePage, showPage }) => {
	const { i18n } = useTranslation();

	const currentLanguage = i18n.language;

	const switchLanguageTo = (lang: string) => async () => {
		if (i18n.language !== lang) {
			await hidePage();
			i18n.changeLanguage(lang);
			await showPage();
		}
	};

	return (
		<LanguageSwitchWrapper>
			<AvailableLanguage
				isSelected={currentLanguage === "pl"}
				onClick={switchLanguageTo("pl")}
			>
				PL
			</AvailableLanguage>{" "}
			/{" "}
			<AvailableLanguage
				isSelected={currentLanguage === "en"}
				onClick={switchLanguageTo("en")}
			>
				EN
			</AvailableLanguage>
		</LanguageSwitchWrapper>
	);
};
