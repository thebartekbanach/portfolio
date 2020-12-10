import { FormValidator } from "./hooks";

export const subjectValidator: FormValidator<number | null> = selectedSubject => {
	if (selectedSubject === null) {
		return ["subject-not-selected"];
	}

	return [];
};

export const emailValidator: FormValidator<string> = emailAddress => {
	const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (emailAddress === "") {
		return ["empty-email-field"];
	}

	if (!emailValidationRegex.test(emailAddress)) {
		return ["email-is-not-valid"];
	}

	return [];
};

export const messageBodyValidator: FormValidator<string> = messageBody => {
	if (messageBody === "") {
		return ["message-body-empty"];
	}

	return [];
};
