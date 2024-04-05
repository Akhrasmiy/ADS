const Joi = require('joi');

exports.postUserSChema = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email:Joi.string().required()
  }),
};
exports.loginUserSchema={
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
exports.verifyUserSchema={
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
exports.forgotpasswordSchema={
  body: Joi.object({
    email: Joi.string().required(),
  }),
}
exports.forgotpassword2Schema={
  body: Joi.object({
    email: Joi.string().required(),
    password:Joi.string().required(),
    emailpassword:Joi.string().required()
  }),
}

exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

exports.updatePasswordSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    password: Joi.string().required(),
  }),
};

exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
