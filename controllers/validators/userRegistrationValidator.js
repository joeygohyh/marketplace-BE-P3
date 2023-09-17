const Joi = require("joi");

const registrationValidators = {
  registerSchema: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      'any.required': 'Password is required.',
    })
  })
};

module.exports = registrationValidators;
