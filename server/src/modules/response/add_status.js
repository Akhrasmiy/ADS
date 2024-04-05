
const { response } = require("express");
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Response = require("./Response");
const User = require("../users/User");

const addStatus = async (data,id) => {
  const user=await User.findById(id)
  if(user.balance<data.summa||data.summa<50000){
    throw new NotFoundError('sizning pulingiz yitmaydi');
  }
  const result = await Response.create({
    ...data,
    user_id:id
  });

  return {
    result
  };
};

module.exports = addStatus;
