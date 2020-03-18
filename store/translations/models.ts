export type PageState = "shown" | "hiding" | "hidden";

export type LoadingState = { [translationProviderId: string]: boolean };

export type AvailableLanguage = { code: string; name: string };
