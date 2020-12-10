import { Children, FC, isValidElement } from "react";
import AnimateHeight from "react-animate-height";
import { Transition, TransitionGroup } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

interface ListWithAnimatedHeightProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component?: any;
}

export const ListWithAnimatedHeight: FC<ListWithAnimatedHeightProps> = ({
	children,
	component
}) => {
	const elements = Children.map(children, child => {
		if (!isValidElement(child)) {
			throw new Error("ListWithAnimatedHeight supports only children with key property set");
		}

		const renderChild = (state: TransitionStatus) => {
			console.log(state);

			const childHeight = state === "entered" || state === "entering" ? "auto" : 0;

			return (
				<AnimateHeight duration={300} height={childHeight} animateOpacity>
					{child}
				</AnimateHeight>
			);
		};

		return <Transition timeout={300}>{renderChild}</Transition>;
	});

	return <TransitionGroup component={component}>{elements}</TransitionGroup>;
};
