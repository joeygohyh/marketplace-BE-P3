const Joi = require("joi");

const editProfileValidators = {
  updateSchema: Joi.object({
    name: Joi.string().min(3).max(100).allow("").optional(),
    email: Joi.string().email().allow("").optional(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .messages({
        "string.min": "Password must be at least 8 characters long.",
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      })
      .optional()
      .allow(""),
  }),
};

module.exports = editProfileValidators;