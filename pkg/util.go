package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
	"runtime"
	"strings"
	"text/template"
)

func getFileMapping(dir string) map[string]string {
	dirs, err := ioutil.ReadDir(dir)
	Handle(err)

	partialMap := map[string]string{}
	for _, file := range dirs {
		if !file.Mode().IsRegular() {
			continue
		}

		fileContent, err := ioutil.ReadFile(filepath.Join(dir, file.Name()))
		Handle(err)

		extLess := strings.TrimSuffix(file.Name(), filepath.Ext(file.Name()))
		partialMap[extLess] = string(fileContent)
	}

	return partialMap
}

func GetPartials() map[string]string {
	return getFileMapping("partials")
}

func GetPages() map[string]string {
	return getFileMapping("pages")
}

func TemplateString(templateName string, templateContent string, pageName string) (string, error) {
	tmpl, err := template.New(templateName).Parse(templateContent)
	if err != nil {
		return "", err
	}

	partialMap := GetPartials()
	println(pageName)

	tmplData := struct {
		CurrentPage string
		UsePartial  func(string) string
	}{
		CurrentPage: pageName,
		UsePartial: func(partialName string) string {
			if _, ok := partialMap[partialName]; ok {
				rawPartial := partialMap[partialName]
				str, err := TemplateString(partialName, rawPartial, pageName)
				if err != nil {
					fmt.Println(err)
					return ""
				}

				return str
			} else {
				return ""
			}
		},
	}

	var buf bytes.Buffer
	err = tmpl.Execute(&buf, tmplData)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}

func ServePage(w http.ResponseWriter, r *http.Request, pageName string) {
	pages := GetPages()
	if RouteMatchesPage(&pages, pageName) {
		w.Header().Set("Content-Type", "text/html")
		templateContent, err := TemplateString(pageName, pages[pageName], pageName)
		// TODO: handle better
		Handle(err)

		fmt.Fprint(w, templateContent)
	} else {
		fourOhFourHandler(w, r)
	}
}

func RouteMatchesPage(pageMap *map[string]string, pageName string) bool {
	if _, ok := (*pageMap)[pageName]; ok {
		return true
	}

	return false
}

func Handle(err error) {
	if err != nil {
		_, file, line, ok := runtime.Caller(1)
		if !ok {
			fmt.Println(err)
			return
		}

		ferr := fmt.Errorf("Error: %s:%d\n    %s", file, line, err)
		log.Fatalln(ferr)
	}
}
