const { response } = require("express");
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const fs = require("fs");
const uuid = require("uuid");
const ResponseStatus = require("./Response_status");
const addStatus = async ( user_id, qoshimcha, buffer) => {
  try {
    const address = `./src/resourses/${uuid.v4()}.${qoshimcha}`;
    fs.writeFileSync(address, buffer, () => {});
    const result = await ResponseStatus.create({
      user_id,
      address,
    });

    return {
      result,
    };
  } catch (error) {
    throw new BadRequestError(error);
  }
};

module.exports = addStatus;
