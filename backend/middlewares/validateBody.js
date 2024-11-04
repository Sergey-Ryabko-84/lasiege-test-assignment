const { httpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    console.log("validateBody");
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;