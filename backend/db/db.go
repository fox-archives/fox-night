package db

import (
	"database/sql"
	"os"
)

var (
	Db *sql.DB
)

func Init() {
	dbFile := "./test.db"

	if err := os.Remove(dbFile); err != nil {
		panic(err)
	}

	db, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		panic(err)
	}

	if _, err := db.Exec(`
		CREATE TABLE media_files (
			uuid STRING NOT NULL PRIMARY KEY,
			file_path TEXT NOT NULL,
			file_name TEXT NOT NULL,
			parent_dir TEXT NOT NULL
		);
	`); err != nil {
		panic(err)
	}

	if _, err := db.Exec(`
		CREATE TABLE media_objects (
			id STRING NOT NULL PRIMARY KEY,
			media_file_uuid TEXT NOT NULL
		)
	`); err != nil {
		panic(err)
	}

	Db = db
}

func Close() {
	defer Db.Close()
}
