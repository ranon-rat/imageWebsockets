package controllers

func sendImage() {
	for {
		message := <-messageChan
		for client := range clients {
			if err := client.WriteMessage(message.MessageType, message.Content); err != nil {
				client.Close()
				delete(clients, client)

			}
		}
	}

}
