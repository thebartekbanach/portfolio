package main

import (
	"errors"

	"github.com/badoux/checkmail"
)

func contains(s []string, expected string) bool {
	for _, v := range s {
		if v == expected {
			return true
		}
	}

	return false
}

func verifyMail(lang, senderEmail, title, message string) error {
	if err := verifyLanguage(lang); err != nil {
		return err
	}

	if err := verifyEmail(senderEmail); err != nil {
		return err
	}

	if err := verifyTitle(title); err != nil {
		return err
	}

	if err := verifyMessage(message); err != nil {
		return err
	}

	return nil
}

func verifyEmail(email string) error {
	if email == "" {
		return errors.New("empty-email-field")
	}

	if err := checkmail.ValidateFormat(email); err != nil {
		return errors.New("email-is-not-valid")
	}

	if err := checkmail.ValidateHost(email); err != nil {
		return errors.New("unresolvable-host")
	}

	/*
		var (
			serverHostName    = "smtp.myserver.com" // set your SMTP server here
			serverMailAddress = "validuser@myserver.com"  // set your valid mail address here
		)

		err := checkmail.ValidateHostAndUser(serverHostName, serverMailAddress, "unknown-user-129083726@gmail.com")

		if smtpErr, ok := err.(checkmail.SmtpError); ok && err != nil {
			fmt.Printf("Code: %s, Msg: %s", smtpErr.Code(), smtpErr)
		}
	*/

	return nil
}

func verifyTitle(titleID string) error {
	// TODO: Read JSON file
	availableTitleIDs := []string{
		"valuate-my-project",
		"make-my-website",
		"i-need-help-with-project",
		"i-just-want-to-contact",
	}

	if !contains(availableTitleIDs, titleID) {
		return errors.New("wrong-title-id")
	}

	return nil
}

func verifyLanguage(langCode string) error {
	// TODO: Read directory names of client/public/locales
	availableLangs := []string{"pl", "en"}

	if !contains(availableLangs, langCode) {
		return errors.New("language-not-valid")
	}

	return nil
}

func verifyMessage(message string) error {
	if message == "" {
		return errors.New("empty-message")
	}

	return nil
}
