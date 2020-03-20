import { ParametrizedTranslation } from "~/lib/translate";

interface CommonSectionTranslations {
	title: string;
	description: string;
}

interface WelcomeSectionTranslations {
	name: string;
	job: string;
	aboutMe: ParametrizedTranslation<{ age: number }>;
	navbar: {
		skills: string;
		realizations: string;
		contact: string;
		sendMeMessage: string;
	};
}

interface SkillsCategoryTranslations {
	title: string;
	description: string;
}

interface SkillsSectionTranslations extends CommonSectionTranslations {
	frontend: SkillsCategoryTranslations;
	backend: SkillsCategoryTranslations;
	embedded: SkillsCategoryTranslations;
}

interface GithubSectionTranslations extends CommonSectionTranslations {
	githubRedirectButtonText: string;
}

interface RealizationsSectionTranslations extends CommonSectionTranslations {
	project: {
		detailsButtonText: string;
		previewButtonText: string;
		githubButtonText: string;
	};
}

interface ContactSectionAboutMeCardTranslations {
	fullName: string;
	aboutMe: ParametrizedTranslation<{ age: number }>;
}

interface ContactSectionTranslations extends CommonSectionTranslations {
	aboutMeCard: ContactSectionAboutMeCardTranslations;
	sendMessageButtonText: string;
}

interface PrivacyPolicyTranslations {
	title: string;
	content: string;
	acceptButtonText: string;
	rejectButtonText: string;
}

export interface PageTranslations {
	welcome: WelcomeSectionTranslations;
	skills: SkillsSectionTranslations;
	github: GithubSectionTranslations;
	realizations: RealizationsSectionTranslations;
	contact: ContactSectionTranslations;
	privacyPolicy: PrivacyPolicyTranslations;
}

export type AvailablePageTranslations = { [languageCode: string]: PageTranslations };
