const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Payment = require("../response/Payments");
const Status = require("../status/Status");
const User = require("../users/User");
const Adsvsuser = require("./Adsvsuser");
const adsvsuserSchema = require("./Adsvsuser");

const addStatus = async (ads_id, user_id) => {
  const result = await Adsvsuser.create({
    ads_id,
    user_id,
  });
  const user = await User.findById(user_id);
  if (user.status == 0) {
    user.balance = user.balance + Number(500);
    await Payment.create({user_id,summa:500})
    await user.save();
    return {
      result,
    };
  }
  const status = await Status.findById(user.status);
  user.balance = user.balance + Number(status.ads_pay);
  await Payment.create({user_id,summa:status.ads_pay})

  await user.save();
  return {
    result,
  };
};

module.exports = addStatus;
