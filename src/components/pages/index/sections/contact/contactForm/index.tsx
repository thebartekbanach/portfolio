import { FC, useState } from "react";
import AnimateHeight from "react-animate-height";

import { useTranslation } from "~/utils/i18next";

import { MessageSubjectSelector } from "./messageSubjectSelector";
import { ContactFormWrapper, MessageBox, SenderEmailAddress, SendMessageButton } from "./styles";

interface AvailableSubject {
	subject: string;
	messagePlaceholder: string;
}

interface ContactFormProps {
	isExpandedOnMobile: boolean;
	isDesktopDevice: boolean;
}

export const ContactForm: FC<ContactFormProps> = ({ isExpandedOnMobile, isDesktopDevice }) => {
	const [t] = useTranslation("indexPage");
	const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null as number | null);

	const subjectsAndMessagePlaceholders = t("contact.contactForm.availableSubjects", {
		returnObjects: true
	}) as AvailableSubject[];

	const subjects = subjectsAndMessagePlaceholders.map(item => item.subject);
	const messagePlaceholder =
		selectedSubjectIndex === null
			? t("contact.contactForm.message.placeholder")
			: subjectsAndMessagePlaceholders.map(item => item.messagePlaceholder)[
					selectedSubjectIndex ?? 0
			  ];

	const renderedForm = (
		<ContactFormWrapper>
			<MessageSubjectSelector
				placeholder={t("contact.contactForm.subject.placeholder")}
				items={subjects}
				selectedItem={selectedSubjectIndex}
				onSelect={setSelectedSubjectIndex}
			/>
			<SenderEmailAddress placeholder={t("contact.contactForm.senderEmail.placeholder")} />
			<MessageBox placeholder={messagePlaceholder} />
			<SendMessageButton>
				{t("contact.contactForm.message.sendMessageButton")}
			</SendMessageButton>
		</ContactFormWrapper>
	);

	if (isDesktopDevice) {
		return renderedForm;
	}

	return (
		<AnimateHeight duration={500} height={isExpandedOnMobile ? "auto" : 0} animateOpacity>
			{renderedForm}
		</AnimateHeight>
	);
};
