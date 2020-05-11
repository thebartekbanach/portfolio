import { SFC } from "react";
import {
	SkillTileItem,
	SkillTileIconWrapper,
	SkillTileItemTitle,
	SkillTileItemDescription,
	SkillTileItemStatePointer,
	SkillTileItemStatePointerIconWrapper,
	SkillTileItemContent
} from "../styles/skillTiles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { SkillsGridAreaNames } from "../styles/skillGrid";
import ArrowSelected from "../../../../../public/img/skills/arrow-selected.svg";
import ArrowNormal from "../../../../../public/img/skills/arrow-normal.svg";

export { SkillsGrid } from "../styles/skillGrid";

interface SkillTileProps {
	tileAreaName: SkillsGridAreaNames;
	icon: React.ElementType;

	title: string;
	description: string;

	isSelected: boolean;
	onClick: () => void;
}

export const SkillTile: SFC<SkillTileProps> = ({
	tileAreaName,
	icon: Icon,
	title,
	description,
	isSelected,
	onClick
}) => {
	const arrowIcon = isSelected ? (
		<CSSTransition key="selected" timeout={500}>
			<SkillTileItemStatePointerIconWrapper>
				<ArrowSelected />
			</SkillTileItemStatePointerIconWrapper>
		</CSSTransition>
	) : (
		<CSSTransition key="unselected" timeout={500}>
			<SkillTileItemStatePointerIconWrapper>
				<ArrowNormal />
			</SkillTileItemStatePointerIconWrapper>
		</CSSTransition>
	);

	return (
		<SkillTileItem tileAreaName={tileAreaName} isSelected={isSelected} onClick={onClick}>
			<SkillTileItemContent>
				<SkillTileIconWrapper>
					<Icon />
				</SkillTileIconWrapper>
				<SkillTileItemTitle>{title}</SkillTileItemTitle>
				<SkillTileItemDescription>{description}</SkillTileItemDescription>
				<SkillTileItemStatePointer isSelected={isSelected}>
					<TransitionGroup>{arrowIcon}</TransitionGroup>
				</SkillTileItemStatePointer>
			</SkillTileItemContent>
		</SkillTileItem>
	);
};
