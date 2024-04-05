const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Status = require("../status/Status");
const User = require("../users/User");
const ResponseStatus = require("./Response_status");
const listStatus = async () => {
  const result = await ResponseStatus.find();
  let data = [];
  for (let i = 0; i < result.length; i++) {
    const person = await User.findById(result[i].user_id);
    const status = await Status.findById(result[i].status_id)||0;

    data.push({
      user_id: person._id,
      email: person.email,
      id: result[i]._id,
      status_id:status?._id,
      status_name:status?.name,
      full_name: person.first_name + " " + person.last_name,
      img: result[i].address,
    });
  }
  return data;
};

module.exports = listStatus;
