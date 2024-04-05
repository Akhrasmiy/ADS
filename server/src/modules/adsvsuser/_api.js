const express = require("express");
const {
  post_status,
  get_status,
  get_one_status,
  edit_status,
  delete_status,
  get_one_ads,
  get_ads,
} = require("./_controllers");
const isSupper = require("../../shared/auth/isSupper");
const isLoggedIn = require("../../shared/auth/is-loggedin");

const fileUpload = require("express-fileupload");

const router = express.Router();
router.use(express.json({ limit: "1000mb" }));
router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 * 1024 * 1024 },
  })
);
router.get("/",isLoggedIn, get_ads);
router.get("/:id",isLoggedIn, post_status);
module.exports = router;
