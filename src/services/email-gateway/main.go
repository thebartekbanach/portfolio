package main

import (
	"log"
	"net/http"
)

var env environment = getEnvironment()

func contactFormMessageSendHandler(w http.ResponseWriter, r *http.Request) {
	var (
		lang        = r.URL.Query().Get("lang")
		title       = r.URL.Query().Get("title")
		senderEmail = r.URL.Query().Get("sender-email")
		message     = r.URL.Query().Get("message")
	)

	if err := verifyMail(lang, senderEmail, title, message); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	isSenderEmailBlocked, err := checkEmailIsBlocked(senderEmail, env)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("blacklist-check-error"))
		return
	}

	if isSenderEmailBlocked {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("email-is-treated-as-spam"))
		return
	}

	if err := sendEmail(lang, title, senderEmail, message, env); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("email-send-error"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("email-received"))
}

func main() {
	log.Println("\n\nApplication started")
	http.HandleFunc("/", contactFormMessageSendHandler)
	log.Panicln(http.ListenAndServe(":80", nil))
}
