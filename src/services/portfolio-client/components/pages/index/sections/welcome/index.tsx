import { DesktopWelcomeSectionContent } from "./desktop";
import { MobileWelcomeSectionContent } from "./mobile";
import { WelcomeSectionWrapper } from "./styles";

export const WelcomeSection = () => {
	return (
		<WelcomeSectionWrapper>
			<MobileWelcomeSectionContent />
			<DesktopWelcomeSectionContent />
		</WelcomeSectionWrapper>
	);
};
