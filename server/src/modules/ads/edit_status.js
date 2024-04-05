const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Ads = require("./Ads");
const uuid = require("uuid");
const fs = require("fs");

const editStatus = async ({ id, data, video }) => {
  console.log(id, data, video);

  const ads = await Ads.findById(id);
  if (video.qoshimcha && video.buffer) {
    const address = `./src/resourses/${uuid.v4()}.${video.qoshimcha}`;
    fs.writeFileSync(address, video.buffer, () => {});
    ads.address=address
  }
  ads.name = data.name;
  ads.link = data.link;
  ads.active = data.active;

  await ads.save();
  return {
    ads,
  };
};

module.exports = editStatus;
