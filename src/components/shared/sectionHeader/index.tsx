import { FC } from "react";

import {
	SectionHeaderElement,
	SectionDescription,
	SectionHeaderAndDescriptionWrapper
} from "./styles";

interface SectionHeaderProps {
	sectionName: string;
	description: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ sectionName, description }) => (
	<SectionHeaderAndDescriptionWrapper>
		<SectionHeaderElement>{sectionName}</SectionHeaderElement>
		<SectionDescription>{description}</SectionDescription>
	</SectionHeaderAndDescriptionWrapper>
);
