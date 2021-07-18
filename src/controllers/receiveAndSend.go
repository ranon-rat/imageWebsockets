package controllers

import "net/http"

func DrawWebsockets(w http.ResponseWriter, r *http.Request) {
	ws, err := Upgrade.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	defer ws.Close()
	clients[ws] = true
	go sendImage()
	receiveImage(ws)

}
