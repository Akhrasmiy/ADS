const { hash } = require("bcryptjs");
const User = require("./User");
const { BadRequestError, NotFoundError } = require("../../shared/errors");
const Confirmation = require("./Confirmation");

const verified = async (data) => {
  const user = await User.findOne({ email: data.email ,isverified:false});
  console.log(user);
  if (!user) {
    throw new NotFoundError("bunday foydalanuvchi yo'q");
  }
  
  if (user.email_code == data.password) {
    user.isverified = true;
    await user.save();
    return user;
  } else {
    throw new BadRequestError("parol notugri kiritildi");
  }
};

module.exports = verified;
