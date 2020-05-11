import { SFC, Fragment } from "react";
import AnimateHeight from "react-animate-height";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import { CubeLoader as Loader } from "./cubeLoader";
//import { CircleLoader as Loader } from "./circleLoader";

export const AnimatedLoader: SFC = ({ children }) => {
	const content = !!children ? (
		<Fragment key="children">{children}</Fragment>
	) : (
		<Loader key="loader" />
	);

	return <AnimateHeight height="auto">{content}</AnimateHeight>;
};
