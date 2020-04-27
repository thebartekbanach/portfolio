import { FC } from "react";
import { Logo } from "./logo";
import { NavItem, NavItemsWrapper, NavItems } from "./styles/navbarItems";
import { NavbarWrapper } from "./styles/navbarWrapper";
import {
	MobileMenuToggleButton,
	MobileMenuToggleButtonIcon
} from "./styles/mobileMenuToggleButton";
import { ContactButton } from "./styles/contactButton";

interface NavigationItem {
	id: string;
	url: string;
	content: string;
}

interface NavItemsListProps {
	items: NavigationItem[];
	onNavItemClick: (id: string) => void;
}

export const NavItemsList: FC<NavItemsListProps> = ({ items, onNavItemClick }) => (
	<>
		{items.map(item => (
			<NavItem key={item.id} onClick={() => onNavItemClick(item.id)}>
				<a href={item.url}>{item.content}</a>
			</NavItem>
		))}
	</>
);

interface NavigationProps extends NavItemsListProps {
	mobileMenuState: boolean;
	logoDirectoryName: string;
	logoUserName: string;
	contactButtonText: string;
	onContactButtonClick: () => void;
	onMobileMenuToggleButtonClick: () => void;
}

export const Navbar: FC<NavigationProps> = ({
	logoDirectoryName,
	logoUserName,
	contactButtonText,
	onContactButtonClick,
	mobileMenuState,
	onMobileMenuToggleButtonClick,
	...navItemsListProps
}) => (
	<NavbarWrapper>
		<Logo directoryName={logoDirectoryName} userName={logoUserName} />
		<MobileMenuToggleButton
			mobileMenuState={mobileMenuState}
			onClick={onMobileMenuToggleButtonClick}
		>
			<MobileMenuToggleButtonIcon mobileMenuState={mobileMenuState} />
		</MobileMenuToggleButton>
		<NavItemsWrapper isShownOnMobile={mobileMenuState}>
			<NavItems isShownOnMobile={mobileMenuState}>
				<NavItemsList {...navItemsListProps} />
				<NavItem key="contact-button">
					<ContactButton onClick={onContactButtonClick}>
						{contactButtonText}
					</ContactButton>
				</NavItem>
			</NavItems>
		</NavItemsWrapper>
	</NavbarWrapper>
);
