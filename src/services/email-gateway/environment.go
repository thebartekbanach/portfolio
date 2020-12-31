package main

import (
	"log"
	"os"
	"strconv"
)

type environment struct {
	envType                      string
	contactEmailHost             string
	emailSMTPServerAddress       string
	emailSMTPServerPort          int
	subjectTranslationsFilesPath string
	subjectJSONTranslationQuery  string
}

func getEnvironment() environment {
	smtpServerPort, err := strconv.Atoi(os.Getenv("EMAIL_SMTP_SERVER_PORT"))
	if err != nil {
		log.Panicln(err)
	}

	envType := os.Getenv("ENV")

	return environment{
		envType:                      envType,
		contactEmailHost:             os.Getenv("CONTACT_EMAIL_HOST"),
		emailSMTPServerAddress:       os.Getenv("EMAIL_SMTP_SERVER_ADDRESS"),
		emailSMTPServerPort:          smtpServerPort,
		subjectTranslationsFilesPath: os.Getenv("SUBJECT_TRANSLATIONS_FILES_PATH"),
		subjectJSONTranslationQuery:  os.Getenv("SUBJECT_JSON_TRANSLATION_QUERY"),
	}
}

func (env environment) isDevEnv() bool {
	return env.envType == "DEV"
}
