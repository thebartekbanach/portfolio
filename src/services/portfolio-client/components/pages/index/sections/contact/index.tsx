import React, { FC, useState } from "react";

import { SectionHeader } from "~/components/shared/sectionHeader";
import { useMatchesDesktopDevices } from "~/hooks/useMatchesDesktopDevices";
import { useTranslation } from "~/utils/i18next";

import { AboutMe } from "./aboutMe";
import { ContactForm } from "./contactForm";
import { AboutMeAndContactFormWrapper, ContactSectionElement } from "./styles";

interface ContactSectionProps {
	userAgent: string;
}

export const ContactSection: FC<ContactSectionProps> = ({ userAgent }) => {
	const [t] = useTranslation("pages.index");

	const [isContactFormExpanded, setIsContactFormExpanded] = useState(false);

	const isDesktopDevice = useMatchesDesktopDevices(userAgent, 900);

	const onContactFormToggle = () => setIsContactFormExpanded(!isContactFormExpanded);

	return (
		<ContactSectionElement id={t("contact.sectionId")}>
			<SectionHeader
				sectionName={t("contact.sectionName")}
				description={t("contact.sectionDescription")}
			/>
			<AboutMeAndContactFormWrapper>
				<AboutMe
					isContactFormExpandedOnMobile={isContactFormExpanded}
					onContactFormExpandToggle={onContactFormToggle}
				/>
				<ContactForm
					isExpandedOnMobile={isDesktopDevice || isContactFormExpanded}
					isDesktopDevice={!!isDesktopDevice}
				/>
			</AboutMeAndContactFormWrapper>
		</ContactSectionElement>
	);
};
