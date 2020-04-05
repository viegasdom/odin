package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"

	"github.com/viegasdom/odin/backend/app"
)

// MachineHandler represents a struct that receives the
// MachineService database layer and implements http handlers
// using the database layer.
type MachineHandler struct {
	machine app.MachineService
}

func NewMachineHandler(m app.MachineService) *MachineHandler {
	mh := &MachineHandler{}
	mh.machine = m
	return mh
}

// GetMachines fetches machines from the database and returns them as response
func (h *MachineHandler) GetMachines() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		machines, mserr := h.machine.Get()
		if mserr != nil {
			http.Error(w, mserr.Error(), http.StatusInternalServerError)
			return
		}

		mjson, jsonerr := json.Marshal(machines)
		if jsonerr != nil {
			http.Error(w, jsonerr.Error(), http.StatusInternalServerError)
			return
		}

		h := w.Header()
		h.Set("Content-Type", "application/json")
		w.Write([]byte(mjson))

	}
}

// CreateMachine receives a json with the machine data and creates an instance
// of that machine in the database.
func (h *MachineHandler) CreateMachine() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := &app.Machine{}

		decerr := json.NewDecoder(r.Body).Decode(m)
		if decerr != nil {
			http.Error(w, decerr.Error(), http.StatusBadRequest)
			return
		}

		err := h.machine.Create(m)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		h := w.Header()
		h.Set("Content-Type", "application/json")
		w.Write([]byte("Machine created with success"))
	}
}

// DeleteMachine receives an id and deletes the corresponding machine id in the database
func (h *MachineHandler) DeleteMachine() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		machineIDStr := chi.URLParam(r, "machineID")

		machineID, converr := strconv.Atoi(machineIDStr)
		if converr != nil {
			http.Error(w, "Invalid ID provided", http.StatusBadRequest)
			return
		}

		err := h.machine.Delete(machineID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		h := w.Header()
		h.Set("Content-Type", "application/json")
		w.Write([]byte("Machine created with success"))
	}
}
