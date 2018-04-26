package api

import (
	"net/http"
	"github.com/gorilla/mux"
	"fmt"
)

func getLeftNav(w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	fmt.Print("vars",vars)
	//idd := vars["id"]
	//component := r.Context().Value("component").(string)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("OK"))

	return nil

}
