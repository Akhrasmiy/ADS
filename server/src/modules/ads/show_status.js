const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Ads = require("./Ads");
const showStatus = async (id) => {
  
  const result = await Ads.findById(id)

  return {
    result
  };
};

module.exports = showStatus;
