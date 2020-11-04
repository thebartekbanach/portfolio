import { FC } from "react";

interface TitleWithGradientProps {
	text: string;
}

export const TitleWithGradient: FC<TitleWithGradientProps> = ({ text }) => (
	<svg width="100%" viewBox="0 0 222 23">
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
		<text lengthAdjust="glyphs" x="-2.1" y="22.8" fill="url(#welcomeSectionTitleGradientSetup)">
			{text}
		</text>
	</svg>
);
