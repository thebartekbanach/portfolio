import { useState, useEffect } from "react";

// Source: https://gist.github.com/donaldpipowitch/b454bbfbc3c81a6708a915086cc0de31
// Returns undefined on server side.
export function useMatchMedia(query: string, defaultValue?: boolean) {
	const [matches, setMatches] = useState(defaultValue);

	useEffect(() => {
		setMatches(matchMedia(query).matches);

		const mediaQueryList = matchMedia(query);
		const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

		// note 1: safari currently doesn't support add/removeEventListener so we use add/removeListener
		// note 2: add/removeListener are maybe marked as deprecated, but that could be wrong
		//         see https://github.com/microsoft/TypeScript/issues/32210
		mediaQueryList.addListener(onChange);
		return () => mediaQueryList.removeListener(onChange);
	}, [query]);

	return matches;
}
