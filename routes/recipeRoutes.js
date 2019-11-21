const router = require("express").Router();

const Recipes = require("../helpers/recipeModel");
const restricted = require("../auth/authMiddleware");
const middleware = require("../validation/middleware");
const schema = require("../validation/schema");

router.get("/", restricted, (req, res) => {
  Recipes.find()
    .then(recipe => {
      res.json({ recipe });
    })
    .catch(err => res.status(500).send(err));
});

router.delete(
  "/:id",
  restricted,

  (req, res) => {
    const { id } = req.params;
    Recipes.remove(id)
      .then(num => {
        if (num === 1) {
          res.status(200).json({
            message: `Post with id ${id} successfully deleted`
          });
        } else {
          res.status(404).json({
            message: "The action with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "Internal Server error"
        });
      });
  }
);

router.put(
  "/:id",
  restricted,
  middleware(schema.recipe, "body"),
  (req, res) => {
    const id = req.params.id;

    Recipes.update(id, req.body)
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

module.exports = router;
