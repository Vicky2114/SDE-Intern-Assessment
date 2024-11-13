const Joi = require('joi');

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must have at least 3 characters',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 6 characters long',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 6 characters long',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
