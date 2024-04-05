const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { UnauthorizedError } = require("../errors");
const User = require("../../modules/users/User");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError("Unauthorized.");
    }

    const decoded = jwt.verify(token, config.jwt.secret, {
      ignoreExpiration: false,
    });

    req.user = decoded;
    const user = await User.findById(decoded.user.id);
    if (
      user.status !== "0" &&
      user?.status_date < new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    ) {
      user.status = 0;
      user.status_date = new Date();
      await user.save();
    }
    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isLoggedIn;
