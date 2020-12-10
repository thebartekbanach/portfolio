import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { FormFieldStateObject } from "../../hooks";
import { AvailableSubject } from "../../types";

import { MessageSubjectSelector } from "./messageSubjectSelector";

interface MessageSubjectInputProps {
	fieldState: FormFieldStateObject<number | null>;
}

export const MessageSubjectInput: FC<MessageSubjectInputProps> = ({ fieldState }) => {
	const [t] = useTranslation("indexPage");

	const subjectsAndMessagePlaceholders = t("contact.contactForm.availableSubjects", {
		returnObjects: true
	}) as AvailableSubject[];

	const subjects = subjectsAndMessagePlaceholders.map(item => item.subject);

	return (
		<MessageSubjectSelector
			placeholder={t("contact.contactForm.subject.placeholder")}
			items={subjects}
			selectedItem={fieldState.value}
			onSelect={fieldState.updateValue}
			showNotSelectedError={fieldState.errors.length !== 0}
		/>
	);
};
