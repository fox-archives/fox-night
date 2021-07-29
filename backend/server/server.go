package server

import (
	"fmt"
	"html/template"
	"io"
	"net/http"

	"github.com/hyperupcall/fox-night/backend/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func Hello(c echo.Context) error {
	return c.Render(http.StatusOK, "hello", "World")
}

func Root(c echo.Context) error {
	return c.Render(http.StatusOK, "hello", "World")
}

func Start() {
	e := echo.New()
	e.HideBanner = true
	e.HidePort = true

	e.Pre(middleware.RemoveTrailingSlash())

	e.Use(middleware.Logger())

	e.Static("/public", "public")

	e.GET("/api/media", routes.ApiMediaRoute)
	e.GET("/tempmovie", routes.TempMovieRoute)
	e.GET("/*", routes.CatchAllRoute)

	address := ":3000"
	fmt.Println("Starting Server at " + address)
	e.Logger.Fatal(e.Start(address))
}
