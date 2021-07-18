package controllers

import "github.com/gorilla/websocket"

var (
	Upgrade     = websocket.Upgrader{}
	clients     = make(map[*websocket.Conn]bool)
	messageChan = make(chan Message)
)

type Message struct {
	Content     []byte
	MessageType int
}
