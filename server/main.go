package main

import (
	"net/http"
	"server/user"

	"github.com/gin-gonic/gin"
)

func home(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "hello",
	})
}

func main() {
	router := gin.Default()
	router.SetTrustedProxies([]string{"192.168.1.2"})

	// Route Handlers / Endpoints
	router.GET("/", home)
	router.GET("user/", user.GetUsers)
	router.GET("user/:accountId", user.GetUserbyId)
	router.POST("user/", user.PostUser)

	router.Run(":8080")
}
