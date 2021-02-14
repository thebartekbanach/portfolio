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

	transition: opacity 200ms, transform 200ms;
	opacity: 0;
	transform: translateY(20px);

	&.enter-active,
	&.enter-done {
		opacity: 1;
		transform: translateY(0px);
	}

	&.enter,
	&.exit-active,
	&.exit {
		opacity: 0;
		transform: translateY(20px);
	}
`;

export const PageContainer: FC<PageContainerProps> = ({ children, useOverflowHidden }) => {
	return (
		<>
			<StyledPageContainer useOverflowHidden={useOverflowHidden}>
				<Navbar />
				{children}
			</StyledPageContainer>
			<LanguageSwitch />
		</>
	);
};
