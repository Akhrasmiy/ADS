const express = require("express");
const fs = require("fs");
const httpValidator = require("../../shared/http-validator");
const addStatus = require("./add_status");
const listStatus = require("./list_status");
const showStatus = require("./show_status");
const editStatus = require("./edit_status");
const path = require("path");
const Ads = require("../ads/Ads");
const User = require("../users/User");
const Status = require("../status/Status");
const Adsvsuser = require("./Adsvsuser");
const { BadRequestError, NotFoundError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const post_status = async (req, res, next) => {
  try {
    const ads_id = req.params.id;
    const exist_ads = await Ads.findById(ads_id);
    if (!exist_ads) {
      throw new NotFoundError("reklama mavjud emas");
    }
    exist_ads.how_many_see = Number(exist_ads.how_many_see) + 1;
    await exist_ads.save();
    const user_id = req.user.user.id;
    const result = await addStatus(ads_id, user_id);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const get_ads = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.user.id);
    if (user.created_at > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) && user.status == 0) {
      console.log(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))
      const userads = await Adsvsuser.find({ user_id: req.user.user.id });
      const today_ads = userads.filter(
        (us) =>
          us.created_at.toISOString().split("T")[0] ==
          new Date().toISOString().split("T")[0]
      );
      if (today_ads.length >= 2) {
        throw new BadRequestError("bugungi so'rovlar to'ldi");
      }
      let ads = await Ads.find({ active: true });
      res.status(201).json({
        data: ads[Math.floor(Math.random() * ads.length)],
      });
    } else if( user.status != "0") {
      const status = await Status.findById(user.status);
      const userads = await Adsvsuser.find({ user_id: req.user.user.id });
      const today_ads = userads.filter(
        (us) =>
          us.created_at.toISOString().split("T")[0] ==
          new Date().toISOString().split("T")[0]
      );
      if (today_ads.length >= Number(status.how_many_ads)) {
        throw new BadRequestError("bugungi sorovlar to'ldi");
      }
      let ads = await Ads.find({ active: true });
      console.log(ads);
      const result = ads[Math.floor(Math.random() * ads.length)];
      res.status(201).json({
        data: result,
      });
    }
    else{
      throw new BadRequestError("tarif sotib oling");

    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get_ads,
  post_status,
};
