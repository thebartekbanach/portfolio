import { useRef, useState } from "react";

export const useStateRef = <S>(initialState: S | (() => S)) => {
	const [state, setState] = useState(initialState);

	const stateRef = useRef(state);
	stateRef.current = state;

	return [stateRef, setState] as [typeof stateRef, typeof setState];
};
