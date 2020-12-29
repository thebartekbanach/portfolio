package main

import (
	"log"
	"os"
	"strconv"
)

type environment struct {
	contactEmailHost       string
	emailSMTPServerAddress string
	emailSMTPServerPort    int
	envType                string
}

func getEnvironment() environment {
	smtpServerPort, err := strconv.Atoi(os.Getenv("EMAIL_SMTP_SERVER_PORT"))
	if err != nil {
		log.Panicln(err)
	}

	envType := os.Getenv("ENV")

	return environment{
		contactEmailHost:       os.Getenv("CONTACT_EMAIL_HOST"),
		emailSMTPServerAddress: os.Getenv("EMAIL_SMTP_SERVER_ADDRESS"),
		emailSMTPServerPort:    smtpServerPort,
		envType:                envType,
	}
}

func isDevEnv(env environment) bool {
	return env.envType == "DEV"
}
