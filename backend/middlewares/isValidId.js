const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utils");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) next(httpError(400, `${req.params.id} is not valid id`));
  next();
};

module.exports = isValidId;
