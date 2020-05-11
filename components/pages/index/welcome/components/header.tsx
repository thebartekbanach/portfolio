import { FC } from "react";
import { NameHeader, SpecializationSubheader, HeaderContainer } from "../styles/header";

interface HeaderProps {
	name: string;
	specialization: string;
}

export const Header: FC<HeaderProps> = ({ name, specialization }) => (
	<HeaderContainer>
		<NameHeader>{name}</NameHeader>
		<SpecializationSubheader>{specialization}</SpecializationSubheader>
	</HeaderContainer>
);
