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
const Response = require("./Response_status");
const ResponseStatus = require("./Response_status");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const post_status = async (req, res, next) => {
  try {
    console.log(req.body, req.files);

    const result = await addStatus(
      req.user.user.id,
      `${req.files.img.name.split(".").at(-1)}`,
      req.files.img.data
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
const get_img = async (req, res, next) => {
  try {
    const respon=await ResponseStatus.findById(req.params.id)
    console.log(respon)
    res.sendFile(path.join(`${process.cwd()}`,`${respon.address}`))
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
    res.sendFile(path.join(`${process.cwd()}`, `${result.result.address}`));
  } catch (error) {
    next(error);
  }
};
const edit_status = async (req, res, next) => {
  try {
    const result = await editStatus(req.params.id,req.body.summa);
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
    
    const result = await ResponseStatus.findByIdAndDelete(params);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get_status,get_img,
  post_status,
  edit_status,
  get_one_ads,
  get_one_status,
  delete_status,
};
