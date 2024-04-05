const { NotFoundError } = require("../../shared/errors");
const Adsvsuser = require("../adsvsuser/Adsvsuser");
const User = require("./User");

const showUser = async (id) => {
  const user = await User.findById(id);
  const userads = await Adsvsuser.find({ user_id: id });
  const today_ads = userads.filter(
    (us) =>
      us.created_at.toISOString().split("T")[0] ==
      new Date().toISOString().split("T")[0]
  );
  user.today_see = today_ads.length;
  if (!user) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  return {user,today_see:today_ads.length};
};

module.exports = showUser;
