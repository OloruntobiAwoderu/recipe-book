const router = require("express").Router();
const Users = require("../helpers/userModel");
const Recipes = require("../helpers/recipeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const restricted = require("../auth/authMiddleware");


router.get("/recipes", restricted, (req, res) => {
    Recipes.find()
      .then(users => {
        res.json({ users });
      })
      .catch(err => res.status(500).send(err));
  });

  module.exports = router;