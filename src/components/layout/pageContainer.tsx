import { FC } from "react";
import styled from "styled-components";

const StyledPageContainer = styled.main`
	position: relative;
	max-width: 1200px;
	margin: 0 auto;
`;

export const PageContainer: FC = ({ children }) => {
	return <StyledPageContainer>{children}</StyledPageContainer>;
};
