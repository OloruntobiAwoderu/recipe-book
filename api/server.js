const express = require("express")
const server = express()

const UserRoutes = require("../routes/userRoutes")
const RecipeRoutes = require('../routes/recipeRoutes')


server.use(express.json())

server.use('/users', UserRoutes)
server.use("/recipe", RecipeRoutes)
server.get("/", (req, res) => {
    res.send("Welcome to my API");
  });

  module.exports = server;