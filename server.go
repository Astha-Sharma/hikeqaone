package main

import (
	"flag"
	"github.com/justinas/alice"
	"html/template"
	"log"
	"net/http"
	"bitbucket.org/drogo/model"
	"bitbucket.org/drogo/api"
	"os"
	"path/filepath"
	"io/ioutil"
	"encoding/json"
)



var cwd, _ = os.Getwd()
var StaticDir = filepath.Join(cwd, "dist", "static")
var docStaticDir = filepath.Join(cwd, "docsapp", "static")


var assets Assets

func init() {
	file, err := ioutil.ReadFile("./dist/static/manifest.json")
	if err != nil {
		log.Printf("Not able to find asset file.Error: %v\n", err)
		os.Exit(1)
	}
	json.Unmarshal(file, &assets)
}
func main() {

	port := flag.String("port", ":9999", "Server Port No")
	m := http.NewServeMux()
	handlers := alice.New()
	staticHandlers := alice.New()

	m.Handle("/component", handlers.Then(http.StripPrefix("/component", api.Handler())))
	m.Handle("/static/", staticHandlers.Then(http.StripPrefix("/static/", http.FileServer(http.Dir(StaticDir)))))
	m.Handle("/public/", staticHandlers.Then(http.StripPrefix("/public/", http.FileServer(http.Dir(docStaticDir)))))
	m.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	m.Handle("/", handlers.ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, "./public/index", &model.Page{
			Title:  "Home",
			State:  "",
		})
	}))

	log.Print("==>>>>>>>>>>>>>>Server Listening on===>>>>>>>>>>> ", *port)
	err := http.ListenAndServe(*port, m)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}

}


func renderTemplate(w http.ResponseWriter, tmpl string, p *model.Page) {
	t, err := template.ParseFiles(tmpl + ".html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = t.Execute(w, p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}