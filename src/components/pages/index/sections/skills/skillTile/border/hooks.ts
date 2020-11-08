import debounce from "lodash.debounce";
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

	// listen for window resize and update pathLength value
	useEffect(() => {
		if (!borderRef.current) {
			return;
		}

		const resizeListener = debounce(() => {
			if (!borderRef.current) {
				return;
			}

			const realPathLength = borderRef.current.getTotalLength();

			if (pathLength !== realPathLength) {
				setPathLength(realPathLength);
			}
		}, 100);

		window.addEventListener("resize", resizeListener, {
			passive: true
		});

		return () => window.removeEventListener("resize", resizeListener);
	}, [borderRef.current]);

	return [borderRef, pathLength] as [typeof borderRef, typeof pathLength];
};
