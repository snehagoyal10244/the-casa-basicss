const { validationResult } = require('express-validator');

/**
 * Runs after express-validator chains.
 * Returns 422 with the first error message if validation fails.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const first = errors.array()[0];
    return res.status(422).json({
      success: false,
      message: first.msg,
      field: first.path,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validate;

