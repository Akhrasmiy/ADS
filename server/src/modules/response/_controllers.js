const express = require("express");
const fs = require("fs");
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
const path = require("path");
const Response = require("./Response");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const post_status = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, poststatusSChema);

    const result = await addStatus(
      req.body,req.user.user.id
    );
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
const get_one_ads = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showStatusSchema);
    const params = req.params.id;
    const result = await showStatus(params);
    res.sendFile(path.join(`${process.cwd()}`,`${result.result.address}`))
  } catch (error) {
    next(error);
  }
};
const edit_status = async (req, res, next) => {
  try {
    const params = req.params.id;
    const result = await editStatus({
      id: params
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const delete_status = async (req, res, next) => {
  try {
    const params = req.params.id;
    httpValidator({ params: req.params }, showStatusSchema);
    const result = await Response.deleteOne({_id:params})
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get_status,
  post_status,
  edit_status,
  get_one_ads,
  get_one_status,
  delete_status
};
