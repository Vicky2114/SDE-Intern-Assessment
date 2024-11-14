const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title cannot be empty.",
    "string.min": "Title must be at least 3 characters long.",
    "string.max": "Title must not exceed 100 characters.",
    "any.required": "Title is required.",
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description cannot be empty.",
    "string.min": "Description must be at least 10 characters long.",
    "string.max": "Description must not exceed 1000 characters.",
    "any.required": "Description is required.",
  }),
  tags: Joi.required(),
}).unknown(true); 

const validateProduct = (req, res, next) => {
  console.log(req.body);
  
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation Error",
      errors: error.details.map((detail) => detail.message),
    });
  }


  if (req.files && req.files.length > 10) {
    return res.status(400).json({
      message: "Validation Error",
      errors: ["You can upload a maximum of 10 images."],
    });
  }

  next();
};

module.exports = {
  validateProduct,
};
