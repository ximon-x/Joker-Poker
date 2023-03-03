package models

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	AccountId string `json:"accountId"`
	Rank      string `json:"rank"`
}

// TODO: Replace with database
var users = []User{
	{AccountId: "1", Rank: "Noob"},
	{AccountId: "2", Rank: "Expert"},
	{AccountId: "3", Rank: "Legend"},
}

func GetUsers(c *gin.Context) {
	c.JSON(http.StatusOK, users)
}

func GetUserbyId(c *gin.Context) {
	requestedId := c.Param("accountId")

	for _, user := range users {
		if user.AccountId == requestedId {
			c.JSON(http.StatusOK, user)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "user not found"})
}

func PostUser(c *gin.Context) {
	var newUser User

	// Call BindJSON to bind the received JSON to
	// newUser.
	if err := c.BindJSON(&newUser); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Did not receive a valid user object.",
		})
	}

	// Add the new user to the slice.
	users = append(users, newUser)
	c.JSON(http.StatusCreated, newUser)
}
