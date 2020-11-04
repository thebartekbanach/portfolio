import React, { FC } from "react";
import { useTranslation } from "~/utils/i18next";
import {
	NavbarLogoSubPagePart,
	NavbarLogoContainer,
	NavbarLogoDevPart,
	NavbarLogoUserNamePart
} from "./styles";

interface LogoProps {
	subPage?: string;
	onLogoClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const Logo: FC<LogoProps> = ({ subPage, onLogoClick }) => {
	const [t] = useTranslation("navbar");

	const subPagePart =
		subPage !== null ? <NavbarLogoSubPagePart>{subPage}</NavbarLogoSubPagePart> : null;

	return (
		<NavbarLogoContainer href={t("logo.href")} data-section-name="start" onClick={onLogoClick}>
			<NavbarLogoDevPart>{t("logo.rootPath")}</NavbarLogoDevPart>
			<NavbarLogoUserNamePart>{t("logo.userName")}</NavbarLogoUserNamePart>
			{subPagePart}
		</NavbarLogoContainer>
	);
};
