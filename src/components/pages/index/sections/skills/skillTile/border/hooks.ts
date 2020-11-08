import { useEffect, useRef, useState } from "react";

export const usePathLength = () => {
	const borderRef = useRef<SVGLineElement>(null);
	const [pathLength, setPathLength] = useState(0);

	useEffect(() => {
		if (!borderRef.current) {
			setPathLength(0);
		} else {
			setPathLength(borderRef.current.getTotalLength());
		}
	}, [borderRef.current]);

	return [borderRef, pathLength] as [typeof borderRef, typeof pathLength];
};
