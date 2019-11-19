const router = require("express").Router();

const Recipes = require("../helpers/recipeModel");
const restricted = require("../auth/authMiddleware");

router.get("/recipes", restricted, (req, res) => {
  Recipes.find()
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.status(500).send(err));
});

router.delete("/:id", restricted, (req, res) => {
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
});

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const {
    ingredients,
    instructions,
    title,
    source,
    category,
    user_id
  } = req.body;
  if (ingredients && instructions && title && source && category && user_id) {
    Recipes.update(id, req.body)
      .then(recipe => {
        res.status(201).json({ recipe });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  } else {
    res.status(400).json({
      error:
        "Please provide ingredients, instructions, title, source and category for the recipe.",
      bodyexample: {
        user_id: "",
        instructions: "",
        source: "",
        category: "",
        ingredients: "",
        title: ""
      }
    });
  }
});

module.exports = router;
