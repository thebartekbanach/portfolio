import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { FormFieldStateObject } from "../../hooks";
import { AvailableSubject } from "../../types";

import { MessageBox } from "./styles";

interface MessageBodyInputProps {
	fieldState: FormFieldStateObject<string>;
	selectedSubjectIndex: number | null;
}

export const MessageBodyInput: FC<MessageBodyInputProps> = ({
	fieldState,
	selectedSubjectIndex
}) => {
	const [t] = useTranslation("indexPage");

	const subjectsAndMessagePlaceholders = t("contact.contactForm.availableSubjects", {
		returnObjects: true
	}) as AvailableSubject[];

	const messagePlaceholder =
		selectedSubjectIndex === null
			? t("contact.contactForm.message.placeholder")
			: subjectsAndMessagePlaceholders.map(item => item.messagePlaceholder)[
					selectedSubjectIndex
			  ];

	return (
		<MessageBox
			placeholder={messagePlaceholder}
			value={fieldState.value}
			onChange={event => fieldState.updateValue(event.target.value)}
			emptyMessageError={fieldState.errors.length !== 0}
		/>
	);
};
