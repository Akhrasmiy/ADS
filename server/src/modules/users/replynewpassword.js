const { hashSync, hash } = require("bcryptjs");
const sendEmail = require("../../nodemeiler");
const User = require("./User");
const { BadRequestError } = require("../../shared/errors");
const Confirmation = require("./Confirmation");

exports.replynewpassword = async (email, password) => {
  try {
    const existing = await User.findOne({ email: email });

    if (!existing) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }
    await sendEmail(email, password);
    existing.email_code=password
    await existing.save();
    return existing.email;
  } catch (error) {
    throw new BadRequestError("xatolik" + error);
  }
};
exports.newpassword = async (email, password, emailpassword) => {
  try {
    const existing = await User.findOne({ email });
    if (!existing) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }
    if (existing.email_code !== emailpassword) {
      throw new BadRequestError("kodni xato kiritding");
    }

    const hashedPassword = await hash(password, 10);
    existing.password = hashedPassword;
    existing.save();
    return existing;
  } catch (error) {
    throw new BadRequestError("xatolik " + error);
  }
};
