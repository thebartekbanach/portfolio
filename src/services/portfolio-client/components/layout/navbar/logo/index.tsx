import React, { FC } from "react";

import { Link, useTranslation } from "~/utils/i18next";

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
	const [t] = useTranslation("common");

	const subPagePart =
		subPage !== null ? <NavbarLogoSubPagePart>{subPage}</NavbarLogoSubPagePart> : null;

	return (
		<Link href={t("navbar.logo.href")} passHref>
			<NavbarLogoContainer data-section-name="start" onClick={onLogoClick}>
				<NavbarLogoDevPart>{t("navbar.logo.rootPath")}</NavbarLogoDevPart>
				<NavbarLogoUserNamePart>{t("navbar.logo.userName")}</NavbarLogoUserNamePart>
				{subPagePart}
			</NavbarLogoContainer>
		</Link>
	);
};
