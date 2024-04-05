const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Payment = require("../response/Payments");

const User = require("../users/User");
const ResponseStatus = require("./Response_status");

const editStatus = async (id,summa) => {

  const Response = await ResponseStatus.findById(id);
  const user = await User.findById(Response.user_id);
  await Payment.create({user_id:Response.user_id,summa:Number(summa)})
  user.balance=user.balance+Number(summa)
  await user.save();
  await ResponseStatus.findByIdAndDelete(id)
  return {
    user
  };
};

module.exports = editStatus;
