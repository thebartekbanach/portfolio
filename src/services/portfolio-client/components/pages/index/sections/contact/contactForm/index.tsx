import { FC, useCallback, useState } from "react";
import AnimateHeight from "react-animate-height";

import { useTranslation } from "~/utils/i18next";

import { useFormField } from "./hooks";
import { EmailAddressInput } from "./inputs/emailAddressInput";
import { MessageBodyInput } from "./inputs/messageBodyInput";
import { MessageSubjectInput } from "./inputs/messageSubjectInput";
import { ContactFormWrapper, SendMessageButton } from "./styles";
import {
	createEmailValidator,
	getEmailDomain,
	messageBodyValidator,
	subjectValidator
} from "./utils";

interface ContactFormProps {
	isExpandedOnMobile: boolean;
	isDesktopDevice: boolean;
}

export const ContactForm: FC<ContactFormProps> = ({ isExpandedOnMobile, isDesktopDevice }) => {
	const [t, i18n] = useTranslation("indexPage");
	const [emailsBlacklist, setEmailsBlacklist] = useState<string[]>([]);
	const [unresolvableDomains, setUnresolvableDomains] = useState<string[]>([]);

	const emailValidator = useCallback(createEmailValidator(emailsBlacklist, unresolvableDomains), [
		emailsBlacklist,
		unresolvableDomains
	]);

	const [subject, subjectErrors, subjectState, setSubjectValidationEnabled] = useFormField(
		null as string | null,
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

	const sendMessage = async () => {
		setSubjectValidationEnabled(true);
		setEmailValidationEnabled(true);
		setMessageValidationEnabled(true);

		if (subjectErrors.length !== 0 || emailErrors.length !== 0 || messageErrors.length !== 0) {
			return;
		}

		const requestBody = {
			lang: i18n.language,
			subjectID: subject,
			senderEmail: email,
			message
		};

		const response = await fetch("/api/email-gateway/", {
			headers: {
				"content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify(requestBody),
			method: "POST"
		});

		const { status } = response;

		if (status === 200) {
			// TODO: notify that everything is ok
			return;
		}

		const error = await response.text();

		if (error === "unresolvable-host") {
			setUnresolvableDomains([...unresolvableDomains, getEmailDomain(email)]);
		} else if (error === "email-is-treated-as-spam") {
			setEmailsBlacklist([...emailsBlacklist, email]);
		}
	};

	const renderedForm = (
		<ContactFormWrapper>
			<MessageSubjectInput fieldState={subjectState} />
			<EmailAddressInput fieldState={emailState} />
			<MessageBodyInput fieldState={messageState} selectedSubjectId={subject} />
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
