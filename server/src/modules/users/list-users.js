const { BadRequestError } = require('../../shared/errors');
const Status = require('../status/Status');
const User = require('./User');

const listUsers = async (q) => {
  let query = {};

  // TODO q kamida 1 ta belgi bo'lsin
  if (q && q != "") {
    query = {
      $or: [
        { email: { $regex: q, $options: 'i' } },
        { last_name: { $regex: q, $options: 'i' } },
        { first_name: { $regex: q, $options: 'i' } }
      ]
    };
  }

  try {
    const data = await User.aggregate([
      { $match: query },
      { $sort: { created_at: -1 } },
      { $sample: { size: 10 } },
    ]);

    const modifiedResult = await Promise.all(data.map(async (item) => {
      const { _id, ...rest } = item;

      try {
        const status = await Status.findById(rest.status);
        rest.statusName = status ? status.name : "no status";
      } catch (error) {
        console.error("Error fetching status:", error);
        rest.statusName = "no status";
      }

      return { id: _id, ...rest };
    }));

    return modifiedResult;
  } catch (error) {
    throw new BadRequestError(error);
  }
};

module.exports = listUsers;

