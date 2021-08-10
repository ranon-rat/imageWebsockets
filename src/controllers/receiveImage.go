package controllers

import (
	"log"

	"github.com/gorilla/websocket"
)

func receiveImage(ws *websocket.Conn) {
	for {
		var message Message
		if err := ws.ReadJSON(&message); err != nil {
			log.Println(err)
			break
		}
		message.client = ws
		messageChan <- message

	}
}
