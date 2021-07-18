package router

import (
	"log"
	"net/http"

	"github.com/ranon-rat/imageWebsockets/src/controllers"
)

func SetupRoutes() error {
	http.Handle("/", http.FileServer(http.Dir("public")))

	http.HandleFunc("/drawWebsockets", controllers.DrawWebsockets)
	log.Println("server at localhost:8080")
	return http.ListenAndServe(":8080", nil)
}
