const router = require("express").Router();
const Users = require("../helpers/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const restricted = require('../auth/authMiddleware')


router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    Users.insert(user)
      .then(created => {
        const token = generateToken(created);
        res.status(201).json({ user: created, token });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  // Log in as user
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    Users.findBy({ email })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome, ${user.name}!`,
            token
          });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // Fetch users
  router.get("/users", restricted, (req, res) => {
    const { email } = req.decodedToken;

      Users.findBy({ email })
        .then(users => {
          res.json({ users });
        })
        .catch(err => res.status(500).send(err));
    
  });
  
  function generateToken(user) {
    const payload = {
     id: user.id,
      email: user.email,
      name: user.name
    };
    const options = {
      expiresIn: "1d"
    };
    // eslint-disable-next-line no-undef
    return jwt.sign(payload, process.env.JWT_SECRET || "oloruntobi", options);
  }
  
  module.exports = router;