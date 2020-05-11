import { FC } from "react";
import { AboutMeContainer } from "../styles/aboutMe";

interface AboutMeProps {
	content: string;
}

export const AboutMe: FC<AboutMeProps> = ({ content }) => (
	<AboutMeContainer dangerouslySetInnerHTML={{ __html: content }} />
);
