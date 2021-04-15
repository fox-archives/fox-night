package main

import (
	"fmt"
	"net/http"
	"time"
)

func rootHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.Redirect(w, r, "/home", 302)
		return
	}

	fourOhFourHandler(w, r)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	pageName := r.URL.Path[1:]
	ServePage(w, r, pageName)
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
	pageName := r.URL.Path[1:]
	ServePage(w, r, pageName)
}

func posterHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../media/poster.jpg")
}

func captionsHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../media/captions.vtt")
}

func videoHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../media/movie.mp4")
}

func fourOhFourHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	fmt.Fprint(w, "<h1>404</h1>")
}

func main() {
	http.HandleFunc("/", rootHandler)
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	http.HandleFunc("/home", homeHandler)
	http.HandleFunc("/about", aboutHandler)
	http.HandleFunc("/media/poster", posterHandler)
	http.HandleFunc("/media/captions", captionsHandler)
	http.HandleFunc("/media/video", videoHandler)
	http.HandleFunc("/404", fourOhFourHandler)
	fmt.Printf("Serving on :8080 %d\n", time.Now().Unix())
	http.ListenAndServe(":8080", nil)
}
