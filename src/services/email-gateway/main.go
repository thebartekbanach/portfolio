package main

import (
	"encoding/json"
	"log"
	"net/http"
)

var env environment = getEnvironment()

type messageSendRequest struct {
	Lang        string `json:"lang"`
	SubjectID   string `json:"subjectID"`
	SenderEmail string `json:"senderEmail"`
	Message     string `json:"message"`
}

func contactFormMessageSendHandler(w http.ResponseWriter, r *http.Request) {
	var request messageSendRequest
	if err := json.NewDecoder(r.Body).Decode((&request)); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("bad-request"))
		log.Println("Error when trying to decode email send request:", err)
		return
	}

	if err := verifyMessageSendRequest(request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	isSenderEmailBlocked, err := checkEmailIsBlocked(request.SenderEmail, env)
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

	translatedSubjectID := convertSubjectIDToTranslatedString(request.SubjectID, request.Lang, env.subjectTranslationsFilesPath, env.subjectJSONTranslationQuery)

	if err := sendEmailUsingGmail(translatedSubjectID, request.SenderEmail, request.Message, env); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("email-send-error"))
		log.Panicln("Error when sending email:", err)
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("email-received"))
}

func main() {
	log.Println("\n\nApplication started")
	authorizeGmailService(env)

	http.HandleFunc("/", contactFormMessageSendHandler)
	log.Panicln(http.ListenAndServe(":80", nil))
}
