const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Ads = require("./Ads");
const listStatus = async () => {
  
  const result = await Ads.find()
  const data = result.map((status) => ({ ...status.toObject(), id: status._id }));
  return data;
};

module.exports = listStatus;
