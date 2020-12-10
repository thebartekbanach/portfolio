import { useLayoutEffect, useRef, useState } from "react";

export const useCssAnimation = (defaultState = false) => {
	const [isAnimationRunning, setIsAnimationRunning] = useState(defaultState);
	const firstRun = useRef(true);

	useLayoutEffect(() => {
		if (firstRun.current) {
			firstRun.current = false;
			return;
		}

		if (!isAnimationRunning) {
			// https://css-tricks.com/restart-css-animation/
			void document.body.offsetWidth;

			setIsAnimationRunning(true);
		}
	}, [isAnimationRunning]);

	const startAnimation = () => {
		// It will always set isAnimationRunning to false.
		// Except first run, when default animation running state defaults to false,
		// then animation running state will be set to true.
		// After set to false, isAnimationRunning will be set again to true
		// by the useEffect visible above.
		// It means:
		// - if animation was not running yet, it just starts it (and state stays at true)
		// - but if animation was running already and ended, then startAnimation should
		//   just stop the animation (that already ended) and start it again, that should restart a css animation
		setIsAnimationRunning(!isAnimationRunning);
	};

	return [isAnimationRunning, startAnimation] as [
		typeof isAnimationRunning,
		typeof startAnimation
	];
};
