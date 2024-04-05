const Joi = require("joi");

exports.poststatusSChema = {
  body: Joi.object({
    card_number: Joi.string().required(),
    summa: Joi.string().required(),
  }),
};

exports.showStatusSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.putstatusSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    ads_pay: Joi.number().required(),
    how_many_ads: Joi.number().required(),
  }),
};

exports.deletestatusSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
