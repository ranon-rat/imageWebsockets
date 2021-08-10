package controllers

import (
	"log"

	"github.com/gorilla/websocket"
)

func sendImage(ws *websocket.Conn) {
	for {
		message := <-messageChan
		for client := range clients {
			if client != message.client {
				log.Println(client.RemoteAddr())
				log.Println(len(clients))
				if err := client.WriteJSON(message); err != nil {
					log.Println(err)
					delete(clients, client)

				}
			}
		}
	}

}
