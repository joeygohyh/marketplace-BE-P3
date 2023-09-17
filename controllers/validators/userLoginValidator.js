const Joi = require("joi");

const loginValidators = {
  loginSchema: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = loginValidators;
