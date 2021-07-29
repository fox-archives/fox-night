package cmd

//lint:file-ignore ST1005 idc

import (
	"fmt"
	"log"
	"os"

	"github.com/fsnotify/fsnotify"
	"github.com/hyperupcall/fox-night/backend/db"
	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/zerolog"
	zlog "github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var rootCmd = &cobra.Command{
	Use:   "fox-night",
	Short: "Fox Night is a movie scanner and streamer",
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {
	log.SetFlags(0)

	cobra.OnInitialize(initViper, initEtc)
}

func initViper() {
	// Set config
	viper.SetConfigName("config")
	viper.SetConfigType("toml")
	viper.AddConfigPath(".")

	// Read config
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			log.Fatalln("Error: could not find config file. Please create a 'config.toml'")
		} else {

			log.Fatalln(fmt.Errorf("Error: could not read config file: %w", err))
		}
	}

	// Watch config
	viper.WatchConfig()
	viper.OnConfigChange(func(e fsnotify.Event) {
		zlog.Info().Msgf("Config file '%s' changed")
	})
}

func initEtc() {
	// zerolog
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	// godotenv
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(fmt.Errorf("Error: Could not load env file: %s", err))
	}

	// sqlite
	db.Init()
}

// func initSqlite() {
// rows, err := db.Query("select id, name from foo")
// if err != nil {
// 	panic(err)
// }
// defer rows.Close()
// for rows.Next() {
// 	var id int
// 	var name string
// 	err = rows.Scan(&id, &name)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Println(id, name)
// }
// err = rows.Err()
// if err != nil {
// 	panic(err)
// }

// stmt, err = db.Prepare("select name from foo where id = ?")
// if err != nil {
// 	panic(err)
// }
// defer stmt.Close()
// var name string
// err = stmt.QueryRow("3").Scan(&name)
// if err != nil {
// 	panic(err)
// }
// fmt.Println(name)

// _, err = db.Exec("delete from foo")
// if err != nil {
// 	panic(err)
// }

// _, err = db.Exec("insert into foo(id, name) values(1, 'foo'), (2, 'bar'), (3, 'baz')")
// if err != nil {
// 	panic(err)
// }

// rows, err = db.Query("select id, name from foo")
// if err != nil {
// 	panic(err)
// }
// defer rows.Close()
// for rows.Next() {
// 	var id int
// 	var name string
// 	err = rows.Scan(&id, &name)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Println(id, name)
// }
// err = rows.Err()
// if err != nil {
// 	panic(err)
// }
// }
