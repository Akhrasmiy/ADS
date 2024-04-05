const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Status = require("./Status");
const showStatus = async (id) => {
  
  const result = await Status.findById(id)

  return {
    result
  };
};

module.exports = showStatus;
