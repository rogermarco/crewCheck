package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func setupRouter() *gin.Engine {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	API_KEY := os.Getenv("VITE_API_KEY")

	// Setup router
	r := gin.Default()

	r.GET("/api/:name", func(c *gin.Context) {
		name := c.Param("name")
		url := "https://online-movie-database.p.rapidapi.com/actors/get-all-filmography?nconst=" + name

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		req.Header.Add("x-rapidapi-key", API_KEY)
		req.Header.Add("x-rapidapi-host", "online-movie-database.p.rapidapi.com")

		res, err := http.DefaultClient.Do(req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		defer res.Body.Close()

		c.DataFromReader(http.StatusOK, res.ContentLength, res.Header.Get("Content-Type"), res.Body, nil)

	})

	return r
}

func main() {
	r := setupRouter()
	r.Run(":8080")
}
