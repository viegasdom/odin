package postgres

import (
	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq" // Postgres driver dependency should be initialized in the postgres package
)

// Open intitializes the database with the source name provided
// source name should be provided in the same format
// sql.Open source name is provided.
func Open(dataSourceName string) (*sqlx.DB, error) {
	db, conerr := sqlx.Connect("postgres", dataSourceName)
	if conerr != nil {
		return nil, conerr
	}

	// Initializes database with schema values
	// It will only trigger the schema setup on the first run
	// For further updates on the schema migrations should be done
	// TODO: migrations cmd to create schema migrations
	db.Exec(schema)

	return db, nil
}
