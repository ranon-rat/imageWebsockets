package main

import (
	"log"

	"github.com/ranon-rat/imageWebsockets/src/router"
)

func main() {
	log.Println(router.SetupRoutes())
}
