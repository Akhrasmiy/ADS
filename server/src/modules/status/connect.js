const { NotFoundError, BadRequestError } = require("../../shared/errors");
const User = require("../users/User");
const Payments = require("../response/Payments");
const Status = require("./Status");
const connect = async (id, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("user topilmadi");
  if (id == 0) {
    user.status = 0;
  } else {
    const status = await Status.findById(id);
    if (!status) throw new NotFoundError("status topilmadi");

    if (user.balance < status.price) {
      throw new NotFoundError("hisobingizda yitarli mablag yo'q");
    }
    
    user.balance = user.balance - status.price
    await Payments.create({user_id:userId,summa:-Number(status.price)})
    user.status_date = new Date()
    user.status = id;
  }

  await user.save();
  return {
    user,
  };
};

module.exports = connect;
