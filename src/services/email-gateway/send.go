package main

import (
	"crypto/tls"
	"fmt"
	"log"

	gomail "gopkg.in/gomail.v2"
)

func sendEmail(lang, title, senderEmail, message string, env environment) error {
	var to string

	// TODO: Create JSON file with (key, value) of (lang, email)
	if lang == "pl" {
		to = fmt.Sprintf("%s@%s", "kontakt", env.contactEmailHost)
	} else {
		to = fmt.Sprintf("%s@%s", "contact", env.contactEmailHost)
	}

	msg := gomail.NewMessage()

	msg.SetHeader("From", senderEmail)
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", title)
	msg.SetBody("text/plain", message)

	dialer := gomail.NewDialer(env.emailSMTPServerAddress, env.emailSMTPServerPort, to, "")
	dialer.TLSConfig = &tls.Config{InsecureSkipVerify: env.isDevEnv()}

	if err := dialer.DialAndSend(msg); err != nil {
		log.Println("Message send error:", err)
		return err
	}

	return nil
}
