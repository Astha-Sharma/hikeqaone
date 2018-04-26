package api

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)


func Handler() *mux.Router {
	m := getRouter()
	m.Get("get:leftnav").Handler(handler(getLeftNav))
	return m
}

type handler func(http.ResponseWriter, *http.Request) error

func (h handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	err := h(w, r)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "error: %s", err)
		log.Println(err)
	}
}



func getRouter() *mux.Router {
	m := mux.NewRouter()
	m.Path("/getleftnav").Methods("GET").Name("get:leftnav")
	return m
}
