import { FC } from "react";
import AnimateHeight from "react-animate-height";

import { useTranslation } from "~/utils/i18next";

import { useFormField } from "./hooks";
import { EmailAddressInput } from "./inputs/emailAddressInput";
import { MessageBodyInput } from "./inputs/messageBodyInput";
import { MessageSubjectInput } from "./inputs/messageSubjectInput";
import { ContactFormWrapper, SendMessageButton } from "./styles";
import { emailValidator, messageBodyValidator, subjectValidator } from "./utils";

interface ContactFormProps {
	isExpandedOnMobile: boolean;
	isDesktopDevice: boolean;
}

export const ContactForm: FC<ContactFormProps> = ({ isExpandedOnMobile, isDesktopDevice }) => {
	const [t] = useTranslation("indexPage");

	const [subject, subjectErrors, subjectState, setSubjectValidationEnabled] = useFormField(
		null as number | null,
		subjectValidator
	);
	const [email, emailErrors, emailState, setEmailValidationEnabled] = useFormField(
		"",
		emailValidator
	);
	const [message, messageErrors, messageState, setMessageValidationEnabled] = useFormField(
		"",
		messageBodyValidator
	);

	const sendMessage = () => {
		setSubjectValidationEnabled(true);
		setEmailValidationEnabled(true);
		setMessageValidationEnabled(true);

		console.log(subject);
		console.log(email);
		console.log(message);

		console.log(subjectErrors);
		console.log(emailErrors);
		console.log(messageErrors);
	};

	const renderedForm = (
		<ContactFormWrapper>
			<MessageSubjectInput fieldState={subjectState} />
			<EmailAddressInput fieldState={emailState} />
			<MessageBodyInput fieldState={messageState} selectedSubjectIndex={subject} />
			<SendMessageButton onClick={sendMessage}>
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
