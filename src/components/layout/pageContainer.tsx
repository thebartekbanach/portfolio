import { FC } from "react";
import styled from "styled-components";
import { Navbar } from "./navbar";

const StyledPageContainer = styled.main`
	position: relative;
	max-width: 1200px;
	margin: 0 auto;
`;

export const PageContainer: FC = ({ children }) => {
	return (
		<StyledPageContainer>
			<Navbar />
			{children}
		</StyledPageContainer>
	);
};
