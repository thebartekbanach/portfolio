import { SFC } from "react";
import {
	SectionHeadersContainer,
	SectionHeader,
	SectionDescription
} from "../styles/sectionHeaders";

interface SectionHeadersProps {
	title: string;
	description: string;
}

export const SectionHeaders: SFC<SectionHeadersProps> = ({ title, description }) => (
	<SectionHeadersContainer>
		<SectionHeader>{title}</SectionHeader>
		<SectionDescription dangerouslySetInnerHTML={{ __html: description }} />
	</SectionHeadersContainer>
);
