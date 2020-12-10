import React, { FC, useState } from "react";

import { SectionHeader } from "~/components/shared/sectionHeader";
import { useMatchesDesktopDevices } from "~/hooks/useMatchesDesktopDevices";

import { AboutMe } from "./aboutMe";
import { ContactForm } from "./contactForm";
import { AboutMeAndContactFormWrapper, ContactSectionElement } from "./styles";

interface ContactSectionProps {
	userAgent: string;
}

export const ContactSection: FC<ContactSectionProps> = ({ userAgent }) => {
	const [isContactFormExpanded, setIsContactFormExpanded] = useState(false);

	const isDesktopDevice = useMatchesDesktopDevices(userAgent, 900);

	const onContactFormToggle = () => setIsContactFormExpanded(!isContactFormExpanded);

	return (
		<ContactSectionElement>
			<SectionHeader
				sectionName="Kontakt"
				description="Szukasz świetnego programisty?<br />Zapraszam do kontaktu!"
			/>
			<AboutMeAndContactFormWrapper>
				<AboutMe onContactFormExpandToggle={onContactFormToggle} />
				<ContactForm
					isExpandedOnMobile={isDesktopDevice || isContactFormExpanded}
					isDesktopDevice={!!isDesktopDevice}
				/>
			</AboutMeAndContactFormWrapper>
		</ContactSectionElement>
	);
};
