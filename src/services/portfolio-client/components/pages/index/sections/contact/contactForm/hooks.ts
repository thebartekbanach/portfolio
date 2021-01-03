import { useEffect, useMemo, useRef, useState } from "react";

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

	const actualValidationErrors = useMemo(() => fieldValidator(fieldValue), [
		fieldValue,
		fieldValidator
	]);

	const [fieldStateValidationErrors, setFieldStateValidationErrors] = useState(
		defaultFieldValidationEnabledState ? actualValidationErrors : []
	);

	useEffect(() => {
		if (isFieldValidationEnabled) {
			setFieldStateValidationErrors(actualValidationErrors);
		}
	}, [fieldValue, isFieldValidationEnabled, fieldValidator]);

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

export const useShortMessageAnimation = (showTime: number, onMessageShowEnd?: () => void) => {
	const [isMessageShown, setIsMessageShown] = useState(false);
	const timeoutId = useRef(null as number | null);

	const onShowEnd = () => {
		timeoutId.current = null;
		setIsMessageShown(false);

		if (onMessageShowEnd !== undefined) {
			onMessageShowEnd();
		}
	};

	useEffect(() => {
		if (isMessageShown) {
			timeoutId.current = setTimeout(onShowEnd, showTime);
		}
	}, [isMessageShown]);

	const showMessage = () => {
		setIsMessageShown(true);
	};

	const abortMessage = () => {
		if (timeoutId.current !== null) {
			clearTimeout(timeoutId.current);
			timeoutId.current = null;
		}
	};

	return [isMessageShown, showMessage, abortMessage] as [
		typeof isMessageShown,
		typeof showMessage,
		typeof abortMessage
	];
};
