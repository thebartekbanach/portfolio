import { FC, isValidElement, useEffect, useRef, useState } from "react";

import { AnimateWidth } from "../animateWidth";

import { CurrentChildrenWrapper, NextChildrenAbsoluteWrapper } from "./styles";

interface HorizontalReplacementContainerProps {
	zIndex?: number;
	duration?: number;
}

export const HorizontalReplacementContainer: FC<HorizontalReplacementContainerProps> = ({
	children,
	zIndex,
	duration = 500
}) => {
	if (!isValidElement(children)) {
		throw new Error("ReplacementContainer children must be a valid react element");
	}

	if (children.key === null || children.key === undefined) {
		throw new Error("ReplacementContainer children key cannot be null or undefined");
	}

	const [isChildrenVisible, setIsChildrenVisible] = useState(true);
	const [currentChildren, setCurrentChildren] = useState(children);
	const [widthOverride, setWidthOverride] = useState<"auto" | number>("auto");

	const nextChildrenRef = useRef<HTMLDivElement>(null);

	const onWidthAnimationEnd = () => {
		if (!isChildrenVisible) {
			setCurrentChildren(children);
			setIsChildrenVisible(true);
			setWidthOverride("auto");
		}
	};

	useEffect(() => {
		if (nextChildrenRef.current === null) {
			return;
		}

		const nextChildrenWidth = nextChildrenRef.current.offsetWidth;
		setWidthOverride(nextChildrenWidth);
		setIsChildrenVisible(false);
	}, [children.key]);

	useEffect(() => {
		// update current children when props have been changed
		if (currentChildren.key === children.key) {
			setCurrentChildren(children);
		}
	}, [children.props]);

	const nextChildrenAbsoluteWrapper =
		currentChildren.key === children.key ? null : (
			<NextChildrenAbsoluteWrapper ref={nextChildrenRef}>
				{children}
			</NextChildrenAbsoluteWrapper>
		);

	return (
		<AnimateWidth
			duration={duration}
			width={widthOverride}
			onAnimationEnd={onWidthAnimationEnd}
		>
			<CurrentChildrenWrapper isContentVisible={isChildrenVisible} zIndex={zIndex}>
				{currentChildren}
			</CurrentChildrenWrapper>
			{nextChildrenAbsoluteWrapper}
		</AnimateWidth>
	);
};
