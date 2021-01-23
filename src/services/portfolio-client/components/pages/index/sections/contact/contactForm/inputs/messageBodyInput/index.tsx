import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { FormFieldStateObject } from "../../hooks";
import { AvailableSubject } from "../../types";

import { MessageBox } from "./styles";

interface MessageBodyInputProps {
	fieldState: FormFieldStateObject<string>;
	selectedSubjectId: string | null;
}

export const MessageBodyInput: FC<MessageBodyInputProps> = ({ fieldState, selectedSubjectId }) => {
	const [t] = useTranslation("pages.index");

	const subjectsAndMessagePlaceholders = t("contact.contactForm.availableSubjects", {
		returnObjects: true
	}) as AvailableSubject[];

	const messagePlaceholder =
		selectedSubjectId === null
			? t("contact.contactForm.message.placeholder")
			: subjectsAndMessagePlaceholders.find(subject => subject.id == selectedSubjectId)
					?.messagePlaceholder;

	return (
		<MessageBox
			placeholder={messagePlaceholder}
			value={fieldState.value}
			onChange={event => fieldState.updateValue(event.target.value)}
			emptyMessageError={fieldState.errors.length !== 0}
		/>
	);
};
