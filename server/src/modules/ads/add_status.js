
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Ads = require("./Ads");
const fs = require("fs");
const uuid=require("uuid")

const addStatus = async (data,qoshimcha,Buffer) => {
  const address=`./src/resourses/${uuid.v4()}.${qoshimcha}`
  fs.writeFileSync(address,Buffer,()=>{

  })
  console.log(address)
  const result = await Ads.create({
    ...data,
    address
  });

  return {
    result
  };
};

module.exports = addStatus;
