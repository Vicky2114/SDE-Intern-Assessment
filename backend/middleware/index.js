const authMiddleware = require("./authMiddleware");
const productValidationMiddleware = require("./productValidationMiddleware");
const validationMiddleware = require("./validationMiddleware");
//root file concept
module.exports = {
  authMiddleware,
  productValidationMiddleware,
  validationMiddleware,
};
