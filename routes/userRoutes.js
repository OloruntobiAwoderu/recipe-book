const router = require("express").Router();
const Users = require("../helpers/userModel");
const Recipes = require("../helpers/recipeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const restricted = require("../auth/authMiddleware");
const middleware = require("../validation/middleware");
const schema = require("../validation/schema");

router.post("/register", middleware(schema.user, "body"), (req, res) => {
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
router.post("/login", middleware(schema.userLogin, "body"), (req, res) => {
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

router.put(
  "/:id",
  restricted,
  middleware(schema.recipe, "body"),
  (req, res) => {
    const id = req.params.id;
    Users.update(id, req.body)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
);

router.delete("/:id", restricted,middleware(schema.IsaNumber, 'params'), (req, res) => {
  const id = req.params.id;
  Users.remove(id).then(user => {
    res.status(200).json({
      message: `User with the ${id} has been deleted`,
      user
    });
  });
});
// Fetch users
router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:id/recipes", middleware(schema.IsaNumber, 'params'),(req, res) => {
  const { id } = req.params;

  Users.getUsersRecipes(id)
    .then(recipes =>
      recipes.length
        ? res.status(200).json(recipes)
        : res.status(404).json({ message: `The User doesn't have any recipes` })
    )
    .catch(() =>
      res
        .status(500)
        .json({ error: "The User recipes could not be retrieved." })
    );
});
router.post(
  "/:id/recipes",
  restricted,
  middleware(schema.recipe, "body"),
  (req, res) => {
    const user_id = req.params.id;

    Recipes.insert({ ...req.body, user_id })
      .then(recipe => {
        res.status(201).json({ recipe });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  }
);

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
