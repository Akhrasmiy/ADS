const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Ads = require("./Adsvsuser");
const listStatus = async () => {
  
  const result = await Ads.find()

  return {
    result
  };
};

module.exports = listStatus;
