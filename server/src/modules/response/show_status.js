const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Response = require("./Response");
const showStatus = async (id) => {
  
  const result = await Response.findById(id)

  return {
    result
  };
};

module.exports = showStatus;
