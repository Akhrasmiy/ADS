const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { UnauthorizedError } = require("../errors");
const User = require("../../modules/users/User.js");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = isSupper = async(req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError("Unauthorized.");
    }

    const decoded = jwt.verify(token, config.jwt.secret, {
      ignoreExpiration: false,
    });
    const user=await User.findById(decoded.user.id)
    if(!user.is_admin){
        throw new UnauthorizedError("sizga ruhsat yoq")
    }
    req.user = decoded.id;

    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};

