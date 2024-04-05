const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Status = require("./Status");

const listStatus = async () => {
  try {
    const result = await Status.find();
    const data = result.map((status) => ({ ...status.toObject(), id: status._id }));
    return  data ;
  } catch (error) {
    throw new NotFoundError("Status not found");
  }
};

module.exports = listStatus;
