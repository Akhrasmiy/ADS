const { NotFoundError, BadRequestError } = require("../../shared/errors");
const User = require("../users/User");
const Response = require("./Response");
const listStatus = async () => {
  const result = await Response.find({is_verified:false});
  let data = [];
  for (let i = 0; i < result.length; i++) {
    const person = await User.findById(result[i].user_id);
    data.push({
      user_id: person._id,
      email: person.email,
      id: result[i]._id,
      full_name: person.first_name + " " + person.last_name,
      card_number: result[i].card_number,
      summa: result[i].summa,
    });
  }
  return data;
};

module.exports = listStatus;
