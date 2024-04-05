
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Status = require("./Status");


const addStatus = async (data) => {
  
  const result = await Status.create({
    ...data
  });

  return {
    result
  };
};

module.exports = addStatus;
