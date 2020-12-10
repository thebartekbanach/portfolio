import { FC } from "react";

interface SubTitleElementProps {
	text: string;
}

export const SubTitleElement: FC<SubTitleElementProps> = ({ text }) => (
	<svg width="65%" viewBox="0 0 222 23">
		<text x="-2.1" y="18">
			{text}
		</text>
	</svg>
);
