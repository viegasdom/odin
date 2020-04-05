package main

import (
	"log"

	"github.com/go-chi/chi"

	"github.com/viegasdom/odin/backend/app"
	"github.com/viegasdom/odin/backend/http"
	"github.com/viegasdom/odin/backend/postgres"
)

func main() {
	err := start()
	if err != nil {
		log.Fatalln(err)
	}
}

func start() error {
	db, err := postgres.Open("user=postgres dbname=odin password=mysecretpassword sslmode=disable")
	if err != nil {
		return err
	}
	defer db.Close()

	// Database services
	ms := postgres.NewMachineService(db)

	// Handlers
	mh := http.NewMachineHandler(ms)

	// Router
	r := chi.NewRouter()

	app := app.NewApp(r, mh)
	app.Start()

	return nil
}
