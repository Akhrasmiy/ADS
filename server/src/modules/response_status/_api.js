const express = require("express");
const {
  post_status,
  get_status,
  get_one_status,
  edit_status,
  delete_status,
  get_one_ads,
  get_img,
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
router.post("/",isLoggedIn, post_status);
router.get("/",isLoggedIn,get_status );
router.get("/img/:id",get_img );
router.put("/done/:id",isLoggedIn, isSupper, edit_status);
router.delete("/cancel/:id",isLoggedIn, isSupper, delete_status);
module.exports = router;
