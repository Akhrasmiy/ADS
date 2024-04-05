const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Response = require("./Response");
const Payments = require("./Payments");
const User = require("../users/User");

const editStatus = async ({ id, data, video }) => {
  console.log(id, data, video);

  const ads = await Response.findById(id);
  const user = await User.findById(ads.user_id);
  if(ads.is_verified){
    throw new NotFoundError("bu allaqachon tasdiqlangan")
  }
  user.balance = user.balance - ads.summa;
  await Payments.create({user_id:ads.user_id,summa:(-ads.summa)})
  ads.is_verified = true;
  user.save();
  await ads.save();
  return {
    ads,
  };
};

module.exports = editStatus;
