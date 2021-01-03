import { useEffect, useRef, useState } from "react";

export const useWidthAnimation = (requestedWidth: number | "auto", onAnimationEnd?: () => void) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const childrenRef = useRef<HTMLDivElement>(null);

	const getWrapperWidth = () => wrapperRef.current?.offsetWidth ?? 0;
	const getChildrenWidth = () => childrenRef.current?.offsetWidth ?? 0;

	// because wrapper and children widths are get by offsetWidth
	// which are rounded, we need to get exact values using getBoundingClientRect()
	const areWrapperAndChildrenWidthsEqual = () => {
		const wrapperWidth = Math.floor(wrapperRef.current?.getBoundingClientRect().width ?? 0);
		const childrenWidth = Math.floor(childrenRef.current?.getBoundingClientRect().width ?? 0);

		const result = wrapperWidth === childrenWidth;

		return result;
	};

	const onTransitionEndRef = useRef(null as (() => void) | null);

	const [currentWidth, setCurrentWidth] = useState(requestedWidth);

	useEffect(() => {
		if (wrapperRef.current === null) {
			throw new Error(
				"Cannot addEventListener for transitionend for wrapperRef because ref is null"
			);
		}

		const transitionEndListener = () => {
			if (onTransitionEndRef.current !== null) {
				onTransitionEndRef.current();
				onTransitionEndRef.current = null;
			}
		};

		wrapperRef.current.addEventListener("transitionend", transitionEndListener);

		return () => {
			if (wrapperRef.current !== null) {
			wrapperRef.current.removeEventListener("transitionend", transitionEndListener);
			}
		};
	}, []);

	useEffect(() => {
		if (requestedWidth === currentWidth) {
			return;
		}

		const wrapperWidth = getWrapperWidth();
		const childrenWidth = getChildrenWidth();

		if (currentWidth === "auto") {
			// from "auto" to some value
			// this sets width to initial wrapper width
			// next steps should be
			// auto -> wrapperWidth -> requestedWidth
			// set to requestedWidth should be done using this effect and last line of it
			setCurrentWidth(wrapperWidth);
			return;
		}

		if (requestedWidth === "auto" && !areWrapperAndChildrenWidthsEqual()) {
			// from some value to "auto"
			// this sets width to initial wrapper width
			// next steps should be
			// some value -> childrenWidth -> auto
			setCurrentWidth(childrenWidth);

			// when animation ends, set current width to auto as we expected
			onTransitionEndRef.current = () => {
				setCurrentWidth("auto");

				if (onAnimationEnd !== undefined) {
					onAnimationEnd();
				}
			};
			return;
		}

		if (requestedWidth === "auto" && areWrapperAndChildrenWidthsEqual()) {
			setCurrentWidth("auto");

			onTransitionEndRef.current = null;
			if (onAnimationEnd !== undefined) {
				onAnimationEnd();
			}
			return;
		}

		if (requestedWidth !== "auto") {
			setCurrentWidth(requestedWidth);

			onTransitionEndRef.current = () => {
				if (onAnimationEnd !== undefined) {
					onAnimationEnd();
				}
			};
		}
	}, [requestedWidth, currentWidth]);

	return [currentWidth, wrapperRef, childrenRef] as [
		typeof currentWidth,
		typeof wrapperRef,
		typeof childrenRef
	];
};
