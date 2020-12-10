import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import { FieldWithErrorList } from "../../fieldWithErrorList";
import { FormFieldStateObject } from "../../hooks";

import { SenderEmailAddress } from "./styles";

interface EmailAddressInputProps {
	fieldState: FormFieldStateObject<string>;
}

export const EmailAddressInput: FC<EmailAddressInputProps> = ({ fieldState }) => {
	const [t] = useTranslation("indexPage");

	const translatedErrors = fieldState.errors.map(error =>
		t(`contact.contactForm.senderEmail.errors.${error}`)
	);

	return (
		<FieldWithErrorList fieldErrors={translatedErrors}>
			<SenderEmailAddress
				placeholder={t("contact.contactForm.senderEmail.placeholder")}
				isValid={fieldState.errors.length === 0}
				value={fieldState.value}
				onChange={event => fieldState.updateValue(event.target.value)}
			/>
		</FieldWithErrorList>
	);
};
