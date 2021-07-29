package routes

import (
	"fmt"
	"log"
	"mime"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

func ApiMediaRoute(c echo.Context) error {
	var mediaFiles []string

	for _, dir := range viper.GetStringSlice("scanDirs") {
		dir = os.ExpandEnv(dir)

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
				mediaFiles = append(mediaFiles, path)

				// mediaFiles = append(mediaFiles, url.QueryEscape(path))

				return nil
			}); err != nil {
			panic(err)
		}
	}

	type (
		user struct {
			ID     int      `json:"id"`
			Movies []string `json: "media"`
			Name   string   `json:"name"`
		}
	)

	u := &user{
		ID:     2,
		Movies: mediaFiles,
	}

	if err := c.Bind(u); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, u)
}

func TempMovieRoute(c echo.Context) error {
	medias, ok := c.Request().URL.Query()["media"]
	if !ok {
		fmt.Println("no media uwu")
	}

	if !ok || len(medias[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		return nil
	}

	media := medias[0]

	media, err := url.QueryUnescape(media)
	fmt.Println(media)
	if strings.HasPrefix(media, "/storage/vault/rodinia/Media") || strings.HasPrefix(media, "/storage/rodinia/Media") {
		if !strings.Contains(media, "..") {

			if err != nil {
				fmt.Println("invalid 3")
			}

			http.ServeFile(c.Response().Writer, c.Request(), media)
		} else {
			fmt.Println("invalid 1")
		}
	} else {
		fmt.Println("invalid 23")
	}

	return nil
}

func CatchAllRoute(c echo.Context) error {
	http.ServeFile(c.Response().Writer, c.Request(), filepath.Join("public", "index.html"))
	return nil
}
