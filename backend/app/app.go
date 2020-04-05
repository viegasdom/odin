package app

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

// App represents the application it receives all the dependencies
// necessary for the application to run.
type App struct {
	router         *chi.Mux
	machineHandler machineHandler
}

// NewApp is a constructor for the struct App
func NewApp(router *chi.Mux, mh machineHandler) *App {
	app := &App{}
	app.router = router
	app.machineHandler = mh
	return app
}

// Start intializes the application
func (app *App) Start() {

	// Chi middleware
	app.router.Use(middleware.RequestID)
	app.router.Use(middleware.RealIP)
	app.router.Use(middleware.Logger)
	app.router.Use(middleware.Recoverer)

	// Route setup
	app.router.Route("/machines", func(r chi.Router) {
		r.Post("/", app.machineHandler.CreateMachine())
		r.Get("/", app.machineHandler.GetMachines())
	})

	app.router.Delete("/machines/{machineID}", app.machineHandler.DeleteMachine())

	http.ListenAndServe(":3333", app.router)
}
