import { isNullOrUndefined } from "./isNullOrUndefined";

export type ParametrizedTranslation<T> = T | string;

export function translate<T>(text: ParametrizedTranslation<T>, params: T): string {
	if (isNullOrUndefined(text)) {
		throw new Error("text cannot be null or undefined");
	}

	if (typeof text !== "string") {
		throw new Error("text must be an instance of the string");
	}

	if (isNullOrUndefined(params)) {
		throw new Error("params cannot be null or undefined");
	}

	let result = text as string;

	for (const param in params) {
		const rawValue: unknown = params[param];

		if (isNullOrUndefined(rawValue)) {
			throw new Error("params cannot contain null or undefined");
		}

		if (typeof rawValue !== "string" && typeof rawValue !== "number") {
			throw new Error(
				`params can contain only strings or numbers, "${param}" = "${rawValue}"`
			);
		}

		if (typeof rawValue === "number" && (isNaN(rawValue) || !isFinite(rawValue))) {
			throw new Error("params cannot contain NaN or Infinity");
		}

		const value = rawValue as string | number;

		result = result.split(`{${param}}`).join(value.toString());
	}

	return result;
}
