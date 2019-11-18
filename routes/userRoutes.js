const express = require("express");
const users = require("../helpers/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")



const router = express.Router();


router.get("/", (req, res) => {
  users
    .find()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.post("/", (req, res) => {
    let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

    users.insert(user, "id")
    .then(user => {

        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({
            error: error.message
        })
    })
})

module.exports = router;