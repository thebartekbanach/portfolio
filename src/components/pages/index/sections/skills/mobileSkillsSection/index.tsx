import { FC, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import { Transition, TransitionGroup } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

import { SkillCategoryRoot } from "..";
import { SkillBoardContent } from "../skillBoard";
import { SkillTile } from "../skillTile";
import { SkillsSectionGrid } from "../styles";

import { SkillBoardBody, SkillBoardWrapper } from "./styles";
import { ScrollAnchor } from "./utils";

interface MobileSkillsSectionProps {
	categoryRoots: SkillCategoryRoot[];
}

export const MobileSkillsSection: FC<MobileSkillsSectionProps> = ({ categoryRoots }) => {
	const [selectedCategory, setSelectedCategory] = useState(0 as number);
	const [skillBoardIsVisible, setSkillBoardIsVisible] = useState(false);

	const stickGuard = useRef(new ScrollAnchor());
	const pendingAnimation = useRef(false);

	const onSkillTileClick = (tileIndex: number) => async (e: React.MouseEvent) => {
		if (pendingAnimation.current || (tileIndex === selectedCategory && skillBoardIsVisible)) {
			return;
		}

		pendingAnimation.current = true;

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
				pendingAnimation.current = false;
			}
		};

		const isHeightAnimationEnabled = status === "entered" || window.innerHeight > 800;

		return !skillBoardIsVisible ? null : (
			<SkillBoardWrapper>
				<SkillBoardBody>
					<AnimateHeight
						duration={isHeightAnimationEnabled ? 1000 : 0}
						height={status === "entered" ? "auto" : 0}
						onAnimationEnd={stopStickingIfBoardIsShown}
						animateOpacity
					>
						<SkillBoardContent categories={currentCategoryContent} />
					</AnimateHeight>
				</SkillBoardBody>
			</SkillBoardWrapper>
		);
	};

	const renderedBoard = (
		<Transition key={`${selectedCategory}-board`} timeout={1100}>
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
