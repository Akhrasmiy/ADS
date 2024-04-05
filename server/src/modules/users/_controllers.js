const express = require("express");
const addUser = require("./add-user");
const httpValidator = require("../../shared/http-validator");
const {
  postUserSChema,
  loginUserSchema,
  verifyUserSchema,
  forgotpasswordSchema,
  forgotpassword2Schema,
} = require("./_schemas");
const signInUser = require("./login");
const verified = require("./isverified");
const { replynewpassword, newpassword } = require("./replynewpassword");
const listUsers = require("./list-users");
const User = require("./User");
const admin = require("./admin");
const showUser = require("./show-user");
const Status = require("../status/Status");
const Adsvsuser = require("../adsvsuser/Adsvsuser");
const Payment = require("../response/Payments");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postUserSChema);
    const a = Math.floor(Math.random() * 10 ** 6);

    console.log(a);
    const result = await addUser({ ...req.body, a });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const verify = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, verifyUserSchema);
    if (String(req?.query?.taklif).length) {
      const user = await User.findById(req?.query?.taklif);
      if (user) {
        user.balance = user.balance + 1000;
        user.suggest_people = user.suggest_people + 1;
        await user.save();

      }
    }
    const result = await verified(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, forgotpasswordSchema);
    const newpasword = Math.floor(Math.random() * 10 ** 6);
    console.log(newpasword);
    const result = await replynewpassword(req.body.email, newpasword);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const forgotPassword2 = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, forgotpassword2Schema);
    const newpasword = Math.floor(Math.random() * 10 ** 6);
    const result = await newpassword(
      req.body.email,
      req.body.password,
      req.body.emailpassword
    );

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, loginUserSchema);

    const result = await signInUser(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const GetUser = async (req, res, next) => {
  try {
    const { q } = req.query;

    const result = await listUsers(q);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const GetOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await showUser(id);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const Is_admin = async (req, res, next) => {
  try {
    console.log(req.user);
    const result = await admin(req.user.user.id);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const userme = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.user.id).select("-email_code");
    const payments=await Payment.find({user_id:req.user.user.id})
    let status_name = "";
    let status_ads = 0;
    if (user.status == 0) {
      status_name = "no status";
      if (user.created_at > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)) {
        status_ads = 2;
      }
    } else {
      const status = await Status.findById(user.status);
      status_name = status.name;
      status_ads = status.how_many_ads;
    }
    const userads = await Adsvsuser.find({ user_id: req.user.user.id });
    const today_ads = userads.filter(
      (us) =>
        us.created_at.toISOString().split("T")[0] ==
        new Date().toISOString().split("T")[0]
    );
    user.ads_number = today_ads;
    let payments2=[]
    payments.forEach((el,index)=>{
      payments2.push({el,id:index+1})
    })
    res.json({
      data: { user, status_name,payments:payments2, status_ads, ads_number: today_ads.length },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postUser,
  loginUser,
  GetOneUser,
  verify,
  userme,
  Is_admin,
  forgotPassword,
  forgotPassword2,
  GetUser,
};
