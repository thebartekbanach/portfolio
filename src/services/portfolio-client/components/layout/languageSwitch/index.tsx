import { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { AvailableLanguage, LanguageSwitchWrapper } from "./styles";

export const LanguageSwitch: FC = () => {
	const { i18n } = useTranslation();

	const currentLanguage = i18n.language;

	const switchLanguageTo = (lang: string) => () => {
		if (i18n.language !== lang) {
			i18n.changeLanguage(lang);
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
