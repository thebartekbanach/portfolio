package main

import (
	"encoding/base64"
	"fmt"
	"log"
	"time"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
)

var gmailService *gmail.Service

func authorizeGmailService(env environment) {
	config := oauth2.Config{
		ClientID:     env.gmailClientID,
		ClientSecret: env.gmailClientSecret,
		Endpoint:     google.Endpoint,
		RedirectURL:  env.gmailOAuth2RedirectURL,
	}

	token := oauth2.Token{
		RefreshToken: env.gmailOAuth2RefreshToken,
		AccessToken:  env.gmailOAuth2AccessToken,
		TokenType:    "Bearer",
		Expiry:       time.Now(),
	}

	log.Println("Initializing gmail client")

	var tokenSource = config.TokenSource(context.Background(), &token)

	srv, err := gmail.NewService(context.Background(), option.WithTokenSource(tokenSource))
	if err != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", err)
	}

	gmailService = srv
	if gmailService != nil {
		log.Println("Email service initialized")
	} else {
		log.Fatal("Email service initialization failed")
	}
}

func sendEmailUsingGmail(subject, from, message string, env environment) error {
	var msg gmail.Message

	emailTo := fmt.Sprintln("To:", env.gmailContactEmailAddress)
	emailFrom := fmt.Sprintln("From:", from)
	emailSubject := fmt.Sprintln("Subject:", subject)
	emailMime := "MIME-version: 1.0;\nContent-Type: text/plain; charset=\"UTF-8\";\n\n"

	msgBody := []byte(emailTo + emailFrom + emailSubject + emailMime + "\n" + message)

	msg.Raw = base64.URLEncoding.EncodeToString(msgBody)
	msg.LabelIds = append(msg.LabelIds, "INBOX", "UNREAD")

	_, err := gmailService.Users.Messages.Insert("me", &msg).Do()
	if err != nil {
		return err
	}
	return nil
}
