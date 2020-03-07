interface SectionTranslations {
	title: string;
	description: string;
}

interface WelcomeSectionTranslations {
	name: string;
	job: string;
	aboutMe: string;
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

interface SkillsSectionTranslations extends SectionTranslations {
	frontend: SkillsCategoryTranslations;
	backend: SkillsCategoryTranslations;
	embedded: SkillsCategoryTranslations;
}

interface GithubSectionTranslations extends SectionTranslations {
	githubRedirectButtonText: string;
}

interface RealizationsSectionTranslations extends SectionTranslations {
	project: {
		detailsButtonText: string;
		previewButtonText: string;
		githubButtonText: string;
	};
}

interface ContactSectionAboutMeCardTranslations {
	fullName: string;
	aboutMe: string;
}

interface ContactSectionTranslations extends SectionTranslations {
	aboutMeCard: ContactSectionAboutMeCardTranslations;
	sendMessageButtonText: string;
}

interface PrivacyPolicyTranslations {
	title: string;
	content: string;
	acceptButtonText: string;
	rejectButtonText: string;
}

export interface Translations {
	welcome: WelcomeSectionTranslations;
	skills: SkillsSectionTranslations;
	github: GithubSectionTranslations;
	realizations: RealizationsSectionTranslations;
	contact: ContactSectionTranslations;
	privacyPolicy: PrivacyPolicyTranslations;
}

export interface AvailableLanguage {
	code: string;
	name: string;
	translations?: Translations;
}
