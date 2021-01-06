import { FC } from "react";

import {
	AboutMeTextWrapper,
	FindOutMoreButton,
	FindOutMoreButtonWrapper,
	HelloTextWrapper,
	MobileWelcomeSectionWrapper,
	MyNameWrapper
} from "./styles";

interface ScalableTextElementProps {
	viewBox: string;
	text: string;
}

// example viewBox="0 0 145 23"
const HelloTextElement: FC<ScalableTextElementProps> = ({ text, viewBox }) => (
	<svg width="100%" viewBox={viewBox}>
		<text x="0" y="18">
			{text}
		</text>
	</svg>
);

// example viewBox="0 0 127 13"
const MyNameElement: FC<ScalableTextElementProps> = ({ text, viewBox }) => (
	<svg width="100%" viewBox={viewBox}>
		<defs>
			<linearGradient
				id="welcomeSectionTitleGradientSetup"
				x1="0"
				x2="0"
				y1="0"
				y2="100%"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#4764e6" offset="0%" />
				<stop stopColor="#694fff" offset="100%" />
			</linearGradient>
		</defs>
		<text x="0" y="13" fill="url(#welcomeSectionTitleGradientSetup)">
			{text}
		</text>
	</svg>
);

export const MobileWelcomeSectionContent: FC = () => {
	return (
		<MobileWelcomeSectionWrapper>
			<HelloTextWrapper>
				<HelloTextElement text="Hej, nazywam się" viewBox="0 0 145 23" />
			</HelloTextWrapper>
			<MyNameWrapper>
				<MyNameElement text="Bartek Banach" viewBox="0 0 127 15" />
			</MyNameWrapper>
			<AboutMeTextWrapper>
				Jestem <b>fullstack developerem</b>. Moje ulubione technologie to <b>React</b> oraz{" "}
				<b>Nodejs</b>.
			</AboutMeTextWrapper>
			<FindOutMoreButtonWrapper>
				<FindOutMoreButton href="#">Poznaj mnie</FindOutMoreButton>
			</FindOutMoreButtonWrapper>
		</MobileWelcomeSectionWrapper>
	);
};
