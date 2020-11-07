import { FC } from "react";

import SkillTileArrowNormal from "../../../../../../public/assets/pages/index/skills/arrow/normal.svg";
import SkillTileArrowSelected from "../../../../../../public/assets/pages/index/skills/arrow/selected.svg";

import { Border } from "./border";
import { AnimationStartPoint } from "./border/styles";
import {
	SkillTileArrow,
	SkillTileDescription,
	SkillTileElement,
	SkillTileIconWrapper,
	SkillTileTitle
} from "./styles";

export interface SkillTileInfo {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface SkillTileProps extends SkillTileInfo {
	index: number;
	isSelected: boolean;
	onClick: () => void;
}

export const SkillTile: FC<SkillTileProps> = ({
	icon: Icon,
	title,
	description,
	index,
	isSelected,
	onClick
}) => {
	return (
		<SkillTileElement elementIndex={index} isSelected={isSelected} onClick={onClick}>
			<Border animationStartPoint={index as AnimationStartPoint} isVisible={isSelected} />
			<SkillTileIconWrapper>
				<Icon />
			</SkillTileIconWrapper>
			<SkillTileTitle>{title}</SkillTileTitle>
			<SkillTileDescription>{description}</SkillTileDescription>
			<SkillTileArrow isSelected={isSelected}>
				<SkillTileArrowNormal className="normal" />
				<SkillTileArrowSelected className="selected" />
			</SkillTileArrow>
		</SkillTileElement>
	);
};
