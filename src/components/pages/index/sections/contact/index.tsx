import React, { FC } from "react";

import { SectionHeader } from "~/components/shared/sectionHeader";

import { AboutMe } from "./aboutMe";
import { ContactForm } from "./contactForm";
import { AboutMeAndContactFormWrapper, ContactSectionElement } from "./styles";

export const ContactSection: FC = () => {
	return (
		<ContactSectionElement>
			<SectionHeader
				sectionName="Kontakt"
				description="Szukasz świetnego programisty?<br />Zapraszam do kontaktu!"
			/>
			<AboutMeAndContactFormWrapper>
				<AboutMe />
				<ContactForm />
			</AboutMeAndContactFormWrapper>
		</ContactSectionElement>
	);
};
