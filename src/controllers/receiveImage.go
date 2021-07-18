package controllers

import "github.com/gorilla/websocket"

func receiveImage(ws *websocket.Conn) {
	for {
		messageType, image, err := ws.ReadMessage()
		if err != nil {
			ws.Close()
			delete(clients, ws)
			return
		}
		messageChan <- Message{image, messageType}

	}
}
