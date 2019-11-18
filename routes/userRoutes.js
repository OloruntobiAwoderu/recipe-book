const express = require("express");
const users = require("../helpers/userModel");
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

module.exports = router;