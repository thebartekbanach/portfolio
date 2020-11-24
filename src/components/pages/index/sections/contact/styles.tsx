import styled from "styled-components";

export const ContactSectionElement = styled.section`
	padding-bottom: 150px;
`;

export const AboutMeAndContactFormWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	row-gap: 80px;

	max-width: 460px;
	margin: 0 auto;
	margin-top: 90px;

	@media (min-width: 900px) {
		width: 85%;
		grid-template-columns: 1fr 1fr;
		column-gap: 45px;
		max-width: 800px;
	}
`;
