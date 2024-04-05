const { NotFoundError } = require('../../shared/errors');
const User = require('./User');

exports.editUser = async ({ id, ...changes }) => {
  const existing = await User.findById(id);

  if (!existing) {
    throw new NotFoundError('Foydalanuvchi topilmadi.');
  }

  return User.findByIdAndUpdate(id, changes);
};
