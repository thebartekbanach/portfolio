import React, { FC } from "react";

import { Link } from "~/utils/i18next";

import {
	MobileMenuToggleButton,
	MobileMenuToggleButtonIcon
} from "./styles/mobileMenuToggleButton";
import { NavbarItem, NavbarItems, NavbarContactButton, NavbarContent } from "./styles/navItems";

export interface NavItem {
	text: string;
	href: string;
}

interface NavItemsProps {
	items: NavItem[];
	contactButton: NavItem;

	isMobileMenuOpen: boolean;
	onMobileMenuToggleButtonClick: () => void;
	onNavItemClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const NavItems: FC<NavItemsProps> = ({
	items,
	contactButton,
	isMobileMenuOpen,
	onMobileMenuToggleButtonClick,
	onNavItemClick
}) => {
	const renderedItems = items.map(({ text, href }) => (
		<Link key={text} href={href} passHref>
			<NavbarItem data-section-name={text} onClick={onNavItemClick}>
				{text}
			</NavbarItem>
		</Link>
	));

	return (
		<NavbarContent>
			<NavbarItems isMobileMenuOpen={isMobileMenuOpen}>
				{renderedItems}
				<NavbarContactButton
					href={contactButton.href}
					data-section-name={contactButton.text}
					onClick={onNavItemClick}
				>
					{contactButton.text}
				</NavbarContactButton>
			</NavbarItems>
			<MobileMenuToggleButton
				mobileMenuState={isMobileMenuOpen}
				onClick={onMobileMenuToggleButtonClick}
			>
				<MobileMenuToggleButtonIcon mobileMenuState={isMobileMenuOpen} />
			</MobileMenuToggleButton>
		</NavbarContent>
	);
};
