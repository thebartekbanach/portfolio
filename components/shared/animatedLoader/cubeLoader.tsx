import { AnimatedCubeLoaderContainer, AnimatedLoaderCube } from "./styles/cubeLoader";
import { SFC } from "react";

export const CubeLoader: SFC<{ className?: string }> = ({ className }) => (
	<AnimatedCubeLoaderContainer className={className}>
		<AnimatedLoaderCube />
		<AnimatedLoaderCube />
		<AnimatedLoaderCube />
		<AnimatedLoaderCube />
	</AnimatedCubeLoaderContainer>
);
