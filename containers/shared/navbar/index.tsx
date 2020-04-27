import { FC } from "react";
import { Navbar as NavbarComponent } from "~/components/shared/navbar";
import { useTranslation } from "~/utils/i18next";
import { useSelector, useDispatch } from "react-redux";
import { navbar } from "~/store/navbar";

export const Navbar: FC = () => {
	const { t } = useTranslation("navbar");

	const mobileNavbarState = useSelector(navbar.selectors.isMobileNavbarOpen);

	const dispatch = useDispatch();

	return (
		<NavbarComponent
			items={t("navbarItems", { returnObjects: true })}
			onNavItemClick={() => {}}
			logoDirectoryName={t("logo.rootPath")}
			logoUserName={t("logo.userName")}
			mobileMenuState={mobileNavbarState}
			onMobileMenuToggleButtonClick={() => dispatch(navbar.actions.toggleMenuState())}
			contactButtonText={t("contactButtonContent")}
			onContactButtonClick={() => {}}
		/>
	);
};