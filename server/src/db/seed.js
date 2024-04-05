const mongoose = require("mongoose");
const User = require("../modules/users/User");
const { hash, hashSync } = require("bcryptjs");
const Ads = require("../modules/ads/Ads");
const Response = require("../modules/response/Response");
const Adsvsuser = require("../modules/adsvsuser/Adsvsuser");
const ResponseStatus = require("../modules/response_status/Response_status");
const Status = require("../modules/status/Status");

mongoose
  .connect("mongodb://127.0.0.1:27017/ads", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB ga ulandi.");
  })
  .catch((err) => {
    console.log("DB da xatolik: ", err);
  });

const seedDB = async () => {
  await User.deleteMany({})
  await Ads.deleteMany({})
  await Response.deleteMany({})
  await Adsvsuser.deleteMany({})
  await ResponseStatus.deleteMany({})
  await Status.deleteMany({})
  const a = await User.insertMany([
    {
      first_name: "admin",
      last_name: "admin",
      username: "ulugbek",
      password: hashSync("ulugbek123#", 10),
      email: "abbos@gmail.com",
      isverified: true,
      is_admin: true,
       email_code: 99999
    }
  ]);
};
seedDB().then(() => {
  mongoose.disconnect();
});
