import { FormValidator } from "./hooks";

export const subjectValidator: FormValidator<string | null> = selectedSubject => {
	if (selectedSubject === null) {
		return ["subject-not-selected"];
	}

	return [];
};

export const getEmailDomain = (email: string) => {
	return email.split("@").pop() ?? "";
};

const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const createEmailValidator: (
	emailBlacklist: string[],
	unresolvableDomains: string[]
) => FormValidator<string> = (emailBlacklist, unresolvableDomains) => emailAddress => {
	if (emailAddress === "") {
		return ["empty-email-field"];
	}

	if (!emailValidationRegex.test(emailAddress)) {
		return ["email-is-not-valid"];
	}

	const domain = getEmailDomain(emailAddress);

	if (unresolvableDomains.includes(domain)) {
		return ["unresolvable-domain"];
	}

	if (emailBlacklist.findIndex(email => email === emailAddress) !== -1) {
		return ["email-is-treated-as-spam"];
	}

	return [];
};

export const messageBodyValidator: FormValidator<string> = messageBody => {
	if (messageBody === "") {
		return ["message-body-empty"];
	}

	return [];
};
