const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  poststatusSChema,
  showStatusSchema,
  putstatusSchema,
} = require("./_schemas");
const addStatus = require("./add_status");
const listStatus = require("./list_status");
const showStatus = require("./show_status");
const editStatus = require("./edit_status");
const connect = require("./connect");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const post_status = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, poststatusSChema);
    const result = await addStatus(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const get_status = async (req, res, next) => {
  try {
    const result = await listStatus();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const get_one_status = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showStatusSchema);
    const params = req.params.id;
    const result = await showStatus(params);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const edit_status = async (req, res, next) => {
  try {
    httpValidator({ body: req.body, params: req.params }, putstatusSchema);
    const params = req.params.id;
    const result = await editStatus(params, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const connect_status = async (req, res, next) => {
  try {
    const params = req.params;
    console.log(params);
    const result = await connect(params.id, params.user_id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const connect_status2 = async (req, res, next) => {
  try {
    const params = req.params;
    console.log(params);
    const result = await connect(params.id, req.user.user.id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const response_status = async (req, res, next) => {
  try {
    const params = req.params;
    console.log(params);
    const result = await connect(params.id, params.user_id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get_status,
  connect_status,
  connect_status2,
  post_status,
  response_status,
  edit_status,
  get_one_status,
};
