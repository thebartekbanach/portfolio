import { FC, isValidElement, useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";

import { CurrentChildrenWrapper, NextChildrenAbsoluteWrapper } from "./styles";

interface ReplacementContainerProps {
	zIndex?: number;
}

export const ReplacementContainer: FC<ReplacementContainerProps> = ({ children, zIndex }) => {
	if (!isValidElement(children)) {
		throw new Error("ReplacementContainer children must be a valid react element");
	}

	if (children.key === null || children.key === undefined) {
		throw new Error("ReplacementContainer children key cannot be null or undefined");
	}

	const [currentChildren, setCurrentChildren] = useState(children);
	const [heightOverride, setHeightOverride] = useState<"auto" | number>("auto");
	const [isChildrenVisible, setIsChildrenVisible] = useState(true);

	const nextChildrenRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (nextChildrenRef.current === null) {
			return;
		}

		setHeightOverride(nextChildrenRef.current.getBoundingClientRect().height);
		setIsChildrenVisible(false);
	}, [children.key]);

	useEffect(() => {
		// update current children when props has been changed
		if (currentChildren.key === children.key) {
			setCurrentChildren(children);
		}
	}, [children.props]);

	const onHeightAnimationEnd = () => {
		if (!isChildrenVisible) {
			setCurrentChildren(children);
			setIsChildrenVisible(true);
			setHeightOverride("auto");
		}
	};

	const nextChildrenAbsoluteWrapper =
		currentChildren.key === children.key ? null : (
			<NextChildrenAbsoluteWrapper ref={nextChildrenRef}>
				{children}
			</NextChildrenAbsoluteWrapper>
		);

	return (
		<AnimateHeight
			duration={500}
			height={heightOverride ?? "auto"}
			onAnimationEnd={onHeightAnimationEnd}
		>
			<CurrentChildrenWrapper isContentVisible={isChildrenVisible} zIndex={zIndex}>
				{currentChildren}
			</CurrentChildrenWrapper>
			{nextChildrenAbsoluteWrapper}
		</AnimateHeight>
	);
};
