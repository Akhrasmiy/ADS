const { NotFoundError } = require('../../shared/errors');
const User = require('./User');

const admin = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundError('Foydalanuvchi topilmadi.');
  }

  return user.is_admin;
};

module.exports = admin;
