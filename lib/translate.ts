export type ParametrizedTranslation<T> = T | string;

export function translate<T>(text: ParametrizedTranslation<T>, params: T): string {
	if (text === null || text === undefined) {
		throw new Error("text cannot be null or undefined");
	}

	if (typeof text !== "string") {
		throw new Error("text must be an instance of the string");
	}

	if (params === null || params === undefined) {
		throw new Error("params cannot be null or undefined");
	}

	let result = text as string;

	for (const param in params) {
		if (typeof params[param] === "function" || typeof params[param] === "object") {
			throw new Error("params cannot contain a function or nested object");
		}

		result = result.split(`{${param}}`).join(params[param].toString());
	}

	return result;
}
