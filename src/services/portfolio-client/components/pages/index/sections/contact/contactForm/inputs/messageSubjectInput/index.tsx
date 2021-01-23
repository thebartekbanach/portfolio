import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { FormFieldStateObject } from "../../hooks";
import { AvailableSubject } from "../../types";

import { MessageSubjectSelector } from "./messageSubjectSelector";

interface MessageSubjectInputProps {
	fieldState: FormFieldStateObject<string | null>;
}

export const MessageSubjectInput: FC<MessageSubjectInputProps> = ({ fieldState }) => {
	const [t] = useTranslation("pages.index");

	const subjectsAndMessagePlaceholders = t("contact.contactForm.availableSubjects", {
		returnObjects: true
	}) as AvailableSubject[];

	const subjectIds = subjectsAndMessagePlaceholders.map(item => item.id);

	const subjectTranslator = (subjectId: string) => {
		const subject = subjectsAndMessagePlaceholders.find(item => item.id === subjectId);

		if (subject === undefined) {
			throw new Error("Subject translation error");
		}

		return subject.subject;
	};

	return (
		<MessageSubjectSelector
			placeholder={t("contact.contactForm.subject.placeholder")}
			items={subjectIds}
			translateItem={subjectTranslator}
			selectedItem={fieldState.value}
			onSelect={fieldState.updateValue}
			showNotSelectedError={fieldState.errors.length !== 0}
		/>
	);
};
