package postgres

import (
	"github.com/jmoiron/sqlx"
	"github.com/viegasdom/odin/backend/app"
)

// MachineService represents the database layer implementation for the backend
type MachineService struct {
	DB *sqlx.DB
}

// NewMachineService is a constructor for the MachineService struct
func NewMachineService(db *sqlx.DB) *MachineService {
	ms := &MachineService{}
	ms.DB = db
	return ms
}

// Get fetches all the machines stored in the database
func (ms *MachineService) Get() ([]*app.Machine, error) {
	machines := []*app.Machine{}

	tx := ms.DB.MustBegin()
	err := tx.Select(&machines, "SELECT * FROM machines")

	if err != nil {
		return nil, err
	}

	return machines, nil

}

// Create creates a machine instance in the database
func (ms *MachineService) Create(m *app.Machine) error {
	q := `INSERT INTO machines (URI, ACESS_KEY, NAME) VALUES (?, ?, ?)`

	tx := ms.DB.MustBegin()
	_, err := tx.Exec(q, m.URI, m.AcessKey, m.Name)

	if err != nil {
		return err
	}

	return nil
}

// Delete deletes the machine instance for the provided id from the database
func (ms *MachineService) Delete(id int) error {
	q := `DELETE FROM machines WHERE id = ?`

	tx := ms.DB.MustBegin()
	_, err := tx.Exec(q, id)

	if err != nil {
		return err
	}

	return nil
}
