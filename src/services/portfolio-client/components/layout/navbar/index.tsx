import React, { FC, useCallback, useEffect, useState } from "react";

import { useTranslation } from "~/utils/i18next";
import { scrollToElement } from "~/utils/scrollToElement";

import { Logo } from "./logo";
import { NavItems } from "./navItems";
import { NavbarContainer } from "./styles";

interface NavbarProps {
	pageSubPath?: string;
}

export const Navbar: FC<NavbarProps> = ({ pageSubPath }) => {
	const [t] = useTranslation("navbar");
	const [mobileMenuOpenState, setMobileMenuOpenState] = useState(false);

	const closeOnScrollListener = useCallback(() => {
		setMobileMenuOpenState(false);
	}, []);

	useEffect(() => {
		if (mobileMenuOpenState === true) {
			const scrollListenerConfig = { once: true, passive: true };
			document.addEventListener("scroll", closeOnScrollListener, scrollListenerConfig);
		}
	}, [mobileMenuOpenState]);

	const toggleMenu = () => {
		document.removeEventListener("scroll", closeOnScrollListener);
		setMobileMenuOpenState(!mobileMenuOpenState);
	};

	const scrollToSectionOrRedirect = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		const sectionUrl = e.currentTarget.getAttribute("href");
		const sectionName = e.currentTarget.getAttribute("data-section-name");
		const locationWithSelector = window.location.pathname + "#";

		if (!sectionUrl?.startsWith(locationWithSelector)) {
			return;
		}

		e.preventDefault();

		setMobileMenuOpenState(false);

		const sectionSelector = sectionUrl.slice(locationWithSelector.length - 1);
		const section = document.querySelector(sectionSelector);

		window.history.pushState(
			null,
			t("historyEntry").replaceAll("{{sectionName}}", sectionName ?? ""),
			sectionUrl
		);

		if (section === null) {
			throw new Error(
				`Cannot smoothly scroll to section that does not exist on current page: ${sectionSelector}`
			);
		}

		scrollToElement(section);
	};

	const scrollToTopOfPageOrRedirect = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		const logoHrefUrl = e.currentTarget.getAttribute("href");
		const hrefWithoutSection = logoHrefUrl?.slice(0, logoHrefUrl.indexOf("#"));

		if (window.location.pathname !== hrefWithoutSection) {
			return;
		}

		e.preventDefault();

		setMobileMenuOpenState(false);

		window.history.pushState(null, t("pageMeta:page.rootTitle"), hrefWithoutSection);
	};

	return (
		<NavbarContainer>
			<Logo subPage={pageSubPath} onLogoClick={scrollToTopOfPageOrRedirect} />
			<NavItems
				items={t("navbarItems", { returnObjects: true })}
				contactButton={t("contactButton", { returnObjects: true })}
				isMobileMenuOpen={mobileMenuOpenState}
				onMobileMenuToggleButtonClick={toggleMenu}
				onNavItemClick={scrollToSectionOrRedirect}
			/>
		</NavbarContainer>
	);
};
