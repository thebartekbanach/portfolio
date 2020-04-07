import { FC } from "react";
import { LogoElement, DirectoryName, UserName, LogoWrapper } from "./styles/logo";

interface LogoProps {
	directoryName: string;
	userName: string;
}

export const Logo: FC<LogoProps> = ({ directoryName, userName }) => (
	<LogoWrapper>
		<LogoElement>
			<DirectoryName>{directoryName}</DirectoryName>
			<UserName>{userName}</UserName>
		</LogoElement>
	</LogoWrapper>
);
