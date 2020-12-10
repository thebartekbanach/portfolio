import { useEffect, useMemo, useState } from "react";

export interface FormFieldStateObject<TValue> {
	value: TValue;
	errors: string[];
	updateValue: (newValue: TValue) => void;
}

export type FormValidator<TValue> = (value: TValue) => string[];

/* Returns: [actualFieldValue, validationErrors, formFieldStateObject, validationStateSetter, actualValidationState] */
export function useFormField<TValue>(
	defaultFieldValue: TValue,
	fieldValidator: FormValidator<TValue>,
	defaultFieldValidationEnabledState = false
) {
	const [fieldValue, setFieldValue] = useState(defaultFieldValue);
	const [isFieldValidationEnabled, setIsFieldValidationEnabled] = useState(
		defaultFieldValidationEnabledState
	);

	const actualValidationErrors = useMemo(() => fieldValidator(fieldValue), [fieldValue]);

	const [fieldStateValidationErrors, setFieldStateValidationErrors] = useState(
		defaultFieldValidationEnabledState ? actualValidationErrors : []
	);

	useEffect(() => {
		if (isFieldValidationEnabled) {
			setFieldStateValidationErrors(actualValidationErrors);
		}
	}, [fieldValue, isFieldValidationEnabled]);

	const formFieldsState: FormFieldStateObject<TValue> = {
		value: fieldValue,
		errors: fieldStateValidationErrors,
		updateValue: setFieldValue
	};

	return [
		fieldValue,
		actualValidationErrors,
		formFieldsState,
		setIsFieldValidationEnabled,
		isFieldValidationEnabled
	] as [
		typeof fieldValue,
		typeof actualValidationErrors,
		typeof formFieldsState,
		typeof setIsFieldValidationEnabled,
		typeof isFieldValidationEnabled
	];
}
