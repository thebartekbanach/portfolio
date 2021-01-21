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

	&.enter {
		opacity: 0;
	}

	&.enter-active {
		opacity: 1;
	}

	&.exit-active {
		opacity: 0;
	}

	&.exit {
		opacity: 0;
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
