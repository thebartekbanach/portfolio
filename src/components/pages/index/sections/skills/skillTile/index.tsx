import { FC } from "react";

import SkillTileArrowNormal from "~/public/assets/pages/index/skills/arrow/normal.svg";
import SkillTileArrowSelected from "~/public/assets/pages/index/skills/arrow/selected.svg";

import { AnimationStartPoint, BorderHide } from "./border";
import {
	SkillTileArrow,
	SkillTileDescription,
	SkillTileElement,
	SkillTileElementContent,
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
	onClick: (e: React.MouseEvent) => void;
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
			<BorderHide isVisible={!isSelected} startPoint={index as AnimationStartPoint} />
			<SkillTileElementContent>
				<SkillTileIconWrapper>
					<Icon />
				</SkillTileIconWrapper>
				<SkillTileTitle>{title}</SkillTileTitle>
				<SkillTileDescription>{description}</SkillTileDescription>
				<SkillTileArrow isSelected={isSelected}>
					<SkillTileArrowNormal className="normal" />
					<SkillTileArrowSelected className="selected" />
				</SkillTileArrow>
			</SkillTileElementContent>
		</SkillTileElement>
	);
};
