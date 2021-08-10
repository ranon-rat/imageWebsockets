package main

import (
	"encoding/json"
	"os"
)

type cum struct {
	private string
	Public  string `json:"public"`
}

func main() {
	json.NewEncoder(os.Stdout).Encode(cum{"hello", "world"})

}
