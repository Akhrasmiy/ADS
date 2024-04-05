const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Status = require("./Status");
const editStatus = async (id,data) => {
  
  const status = await Status.findById(id)
    status.name=data.name
    status.ads_pay=data.ads_pay
    status.price=data.price
    status.how_many_ads=data.how_many_ads
    await status.save()
  return {
    status
  };
};

module.exports = editStatus;
