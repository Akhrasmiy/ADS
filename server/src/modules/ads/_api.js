const express = require("express");
const {
  post_status,
  get_status,
  get_one_status,
  edit_status,
  delete_status,
  get_one_ads,
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
router.post("/",isLoggedIn, isSupper, post_status);
router.get("/video/:id", get_one_ads);
router.get("/", get_status);
router.get("/:id",isLoggedIn, get_one_status);
router.put("/:id",isLoggedIn, isSupper, edit_status);
module.exports = router;
