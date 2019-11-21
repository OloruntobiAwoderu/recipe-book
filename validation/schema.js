const Joi = require("joi");
const schemas = {
  user: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6)
      .max(20)
  }),
  userLogin: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6)
      .max(20)
  }),
  recipe: Joi.object().keys({
    title: Joi.string().required(),
    source: Joi.string().required(),
    ingredients: Joi.string().required(),
    category: Joi.string().required(),
    instructions: Joi.string().required()
  }),
  recipeUpdate:Joi.object().keys({
    title: Joi.string().required(),
    source: Joi.string().required(),
    ingredients: Joi.string().required(),
    category: Joi.string().required(),
    instructions: Joi.string().required(),
    user_id: Joi.number().required()
  }),
  IsaNumber: Joi.object().keys({
      id: Joi.number().required()
  })
  // define all the other schemas below
};
module.exports = schemas;
