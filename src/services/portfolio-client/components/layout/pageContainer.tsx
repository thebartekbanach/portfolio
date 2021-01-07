import { FC } from "react";
import styled from "styled-components";

import { LanguageSwitch } from "./languageSwitch";
import { Navbar } from "./navbar";

const StyledPageContainer = styled.main`
	position: relative;
	margin: 0 auto;
	overflow: hidden;
`;

export const PageContainer: FC = ({ children }) => {
	return (
		<StyledPageContainer>
			<Navbar />
			{children}
			<LanguageSwitch />
		</StyledPageContainer>
	);
};
