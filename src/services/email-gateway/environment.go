package main

import (
	"os"
)

type environment struct {
	envType                      string
	subjectTranslationsFilesPath string
	subjectJSONTranslationQuery  string
	gmailClientID                string
	gmailClientSecret            string
	gmailOAuth2AccessToken       string
	gmailOAuth2RefreshToken      string
	gmailOAuth2RedirectURL       string
	gmailContactEmailAddress     string
}

func getEnvironment() environment {
	envType := os.Getenv("ENV")

	return environment{
		envType:                      envType,
		subjectTranslationsFilesPath: os.Getenv("SUBJECT_TRANSLATIONS_FILES_PATH"),
		subjectJSONTranslationQuery:  os.Getenv("SUBJECT_JSON_TRANSLATION_QUERY"),
		gmailClientID:                os.Getenv("GMAIL_CLIENT_ID"),
		gmailClientSecret:            os.Getenv("GMAIL_CLIENT_SECRET"),
		gmailOAuth2AccessToken:       os.Getenv("GMAIL_OAUTH2_ACCESS_TOKEN"),
		gmailOAuth2RefreshToken:      os.Getenv("GMAIL_OAUTH2_REFRESH_TOKEN"),
		gmailOAuth2RedirectURL:       os.Getenv("GMAIL_OAUTH2_REDIRECT_URL"),
		gmailContactEmailAddress:     os.Getenv("GMAIL_CONTACT_EMAIL_ADDRESS"),
	}
}

func (env environment) isDevEnv() bool {
	return env.envType == "DEV"
}
