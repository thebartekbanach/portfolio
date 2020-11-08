import { FC, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import { Transition, TransitionGroup } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

import { SkillCategoryRoot } from "..";
import { SkillBoard } from "../skillBoard";
import { SkillTile } from "../skillTile";
import { SkillsSectionGrid } from "../styles";

import { StickGuard } from "./utils";

interface MobileSkillsSectionProps {
	categoryRoots: SkillCategoryRoot[];
}

export const MobileSkillsSection: FC<MobileSkillsSectionProps> = ({ categoryRoots }) => {
	const [selectedCategory, setSelectedCategory] = useState(1 as number);
	const [skillBoardIsVisible, setSkillBoardIsVisible] = useState(false);

	const stickGuard = useRef(new StickGuard());

	const onSkillTileClick = (tileIndex: number) => async (e: React.MouseEvent) => {
		try {
			await stickGuard.current.scrollToAndStick(e.currentTarget, 45);
		} catch (e) {
			console.warn(
				`User probably was scrolling when tried to scroll to element and stick to, error: ${e}`
			);
		}

		setSelectedCategory(tileIndex);
		setSkillBoardIsVisible(true);
	};

	const currentCategoryContent = categoryRoots.map(root => root.content)[selectedCategory];

	const renderBoard = (status: TransitionStatus) => {
		const stopStickingIfBoardIsShown = ({ newHeight }: { newHeight: number }) => {
			if (newHeight !== 0) {
				stickGuard.current.stopSticking();
			}
		};

		return !skillBoardIsVisible ? null : (
			<AnimateHeight
				duration={status === "entering" ? 0 : 1000}
				height={status === "entered" ? "auto" : 0}
				onAnimationEnd={stopStickingIfBoardIsShown}
			>
				<SkillBoard categories={currentCategoryContent} />
			</AnimateHeight>
		);
	};

	const renderedBoard = (
		<Transition key={`${selectedCategory}-board`} timeout={1500}>
			{renderBoard}
		</Transition>
	);

	const renderedTilesAndBoard = categoryRoots.map((tile, currentIndex) => {
		return (
			<SkillTile
				key={tile.title}
				index={currentIndex}
				icon={tile.icon}
				title={tile.title}
				description={tile.description}
				isSelected={skillBoardIsVisible && ((selectedCategory === currentIndex) as boolean)}
				onClick={onSkillTileClick(currentIndex)}
			/>
		);
	});

	if (skillBoardIsVisible) {
		renderedTilesAndBoard.splice(selectedCategory + 1, 0, renderedBoard);
	}

	return (
		<TransitionGroup appear={true} enter={true} exit={true} component={SkillsSectionGrid}>
			{renderedTilesAndBoard}
		</TransitionGroup>
	);
};
