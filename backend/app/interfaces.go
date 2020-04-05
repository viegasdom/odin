package app

import "net/http"

type Machine struct {
	ID          int    `db:"id"`
	URI         string `json:"uri" db:"uri"`
	AcessKey    string `json:"accessKey" db:"access_key"`
	Name        string `json:"name" db:"name"`
	CreatedDate string `db:"created_at"`
	UpdatedDate string `db:"updated_at"`
}

type MachineService interface {
	Get() ([]*Machine, error)
	Create(*Machine) error
	Delete(id int) error
}

type machineHandler interface {
	GetMachines() http.HandlerFunc
	CreateMachine() http.HandlerFunc
	DeleteMachine() http.HandlerFunc
}
