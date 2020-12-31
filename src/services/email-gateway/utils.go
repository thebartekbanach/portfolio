package main

import (
	"io/ioutil"
	"log"
	"strings"

	"github.com/tidwall/gjson"
)

// translation files path "/root/path/to/translations/${lang}/translation.json"
func convertSubjectIDToTranslatedString(subjectID, lang, translationFilesPath, jsonTranslationPath string) string {
	translationFilePath := strings.ReplaceAll(translationFilesPath, "{lang}", lang)

	translation, err := ioutil.ReadFile(translationFilePath)
	if err != nil {
		log.Panicln("Convert subjectID to translated string error: ", err)
	}

	query := strings.ReplaceAll(jsonTranslationPath, "{id}", subjectID)
	result := gjson.Get(string(translation), query)

	return result.String()
}
