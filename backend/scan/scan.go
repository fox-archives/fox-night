package scan

//lint:file-ignore ST1005 idc

import (
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"mime"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	"github.com/hyperupcall/fox-night/backend/db"
	"github.com/spf13/viper"
)

func Start() {
	for _, rootDir := range viper.GetStringSlice("rootMovieDirs") {
		rootDir := os.ExpandEnv(rootDir)

		movieDirs, err := ioutil.ReadDir(rootDir)
		if err != nil {
			panic(err)
		}

		for _, movieDir := range movieDirs {
			// Each 'movieDir' is a directory that corresponds to a
			// particular movie
			files, err := ioutil.ReadDir(filepath.Join(rootDir, movieDir.Name()))
			if err != nil {
				panic(err)
			}

			for _, file := range files {
				mimeType := mime.TypeByExtension(filepath.Ext(file.Name()))
				if strings.Split(mimeType, "/")[0] == "video" {
						
				}
			}
		}

	}

	for _, dir := range viper.GetStringSlice("scanDirs") {
		dir := os.ExpandEnv(dir)

		tx, err := db.Db.Begin()
		if err != nil {
			// log.Fatalln(fmt.Errorf("Error: Could not begin scan transaction: %w", err))
			panic(err)
		}

		stmt, err := tx.Prepare("INSERT INTO media_files(uuid, file_path, file_name, parent_dir) VALUES(?, ?, ?, ?)")
		if err != nil {
			panic(err)
		}
		defer stmt.Close()

		if err := filepath.Walk(dir,
			func(path string, info os.FileInfo, err error) error {
				if err != nil {
					return err
				}

				if info.IsDir() {
					return nil
				}

				if strings.Split(mime.TypeByExtension(filepath.Ext(path)), "/")[0] != "video" {
					return nil
				}

				fileName := filepath.Base(path)
				parentDir := filepath.Base(filepath.Dir(path))
				_, err = stmt.Exec(uuid.New(), path, fileName, parentDir)
				if err != nil {
					panic(err)
				}

				fmt.Printf("Processing '%s' (%d MiB)\n", fileName, info.Size()/int64(math.Pow(2, 20)))

				return nil
			}); err != nil {
			log.Fatalln(fmt.Errorf("Error: could not walk '%s': %s", dir, err))
		}
		tx.Commit()
	}
}
