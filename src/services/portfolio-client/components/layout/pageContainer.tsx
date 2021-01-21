import { FC } from "react";
import styled from "styled-components";

import { LanguageSwitch } from "./languageSwitch";
import { Navbar } from "./navbar";

interface PageContainerProps {
	useOverflowHidden?: boolean;
}

const StyledPageContainer = styled.main<PageContainerProps>`
	position: relative;
	margin: 0 auto;
	${p => (p.useOverflowHidden ? "overflow: hidden;" : null)};

	transition: opacity 300ms;
	opacity: 0;

	&.enter,
	&.exit-active,
	&.exit {
		opacity: 0;
	}

	&.enter-active,
	&.enter-done {
		opacity: 1;
	}
`;

export const PageContainer: FC<PageContainerProps> = ({ children, useOverflowHidden }) => {
	return (
		<StyledPageContainer useOverflowHidden={useOverflowHidden}>
			<Navbar />
			{children}
			<LanguageSwitch />
		</StyledPageContainer>
	);
};
