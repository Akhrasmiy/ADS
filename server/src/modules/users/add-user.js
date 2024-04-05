const { hash } = require("bcryptjs");
const User = require("./User");
const sendEmail = require("../../nodemeiler");
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Confirmation = require("./Confirmation");

const addUser = async (data) => {
  // TODO ishlashini tekshirish kerak. User.findOne({ $or: [{username: data.username}, { email: data.email}]})
  const existinguser=await User.findOne({username:data.username,isverified:true})||await User.findOne({email:data.email,isverified:true})
  if(existinguser) {
    // TODO specific xatolik classini ishlatish
    throw new Error("bunaqa user mavjud")
  }

  const existingnoverify=await User.findOne({username:data.username,isverified:false})||await User.findOne({email:data.email,isverified:false})

  if(existingnoverify){
    // TODO mongodb $or
   await User.deleteMany({username:data.username,isverified:false})
   await User.deleteMany({email:data.email,isverified:false})
  }


  const hashedPassword = await hash(data.password, 10);

  await sendEmail(data.email, data.a);
  const result = await User.create({
    ...data,
    password: hashedPassword,
    email_code:data.a
  });

  return {
    email: result.email,
  };
};

module.exports = addUser;
