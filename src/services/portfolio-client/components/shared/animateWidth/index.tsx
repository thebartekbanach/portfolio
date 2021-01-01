import { CSSProperties, FC, useEffect, useRef, useState } from "react";

interface AnimateWidthProps {
	duration: number;
	width: number | "auto";
	onAnimationEnd?: () => void;
}

export const AnimateWidth: FC<AnimateWidthProps> = ({
	duration,
	width,
	onAnimationEnd,
	children
}) => {
	const [currentWidth, setCurrentWidth] = useState<number | "auto">(width);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const childrenRef = useRef<HTMLDivElement>(null);

	const widthRef = useRef(width);
	widthRef.current = width;

	const currentWidthRef = useRef(currentWidth);
	currentWidthRef.current = currentWidth;

	useEffect(() => {
		if (currentWidth === width) {
			return;
		}

		if (width !== "auto") {
			// https://stackoverflow.com/questions/43125220/react-element-width-animation
			requestAnimationFrame(() => {
				const realWidth = wrapperRef.current?.offsetWidth ?? 0;
				setCurrentWidth(realWidth);
			});

			return;
		}

		const childrenWidth = childrenRef.current?.offsetWidth ?? 0;
		requestAnimationFrame(() => {
			wrapperRef.current?.addEventListener(
				"transitionend",
				() => {
					if (widthRef.current !== "auto" || currentWidthRef.current === "auto") {
						setCurrentWidth(widthRef.current); // have to set currentWidth to width because below effect does not start on many changes
						return;
					}

					if (onAnimationEnd !== undefined) {
						onAnimationEnd();
					}

					setCurrentWidth("auto");
				},
				{ once: true }
			);

			setCurrentWidth(childrenWidth);
		});
	}, [width]);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (widthRef.current !== "auto" && widthRef.current !== currentWidth) {
				setCurrentWidth(width);
			}
		});
	}, [currentWidth]);

	const wrapperStyles: CSSProperties = {
		transition: `${duration}ms`,
		width: typeof currentWidth === "number" ? `${currentWidth}px` : currentWidth,
		overflow: "hidden"
	};

	return (
		<div ref={wrapperRef} style={wrapperStyles}>
			<span ref={childrenRef}>{children}</span>
		</div>
	);
};
