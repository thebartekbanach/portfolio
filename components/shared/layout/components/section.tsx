import styled from "styled-components";

interface SectionProps {
	isFirstSection?: boolean;
}

export const Section = styled.section<SectionProps>`
	display: block;
	width: 100%;

	padding-top: ${p => (p.isFirstSection ? 0 : 100)}px;
`;
