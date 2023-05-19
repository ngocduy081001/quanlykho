var express = require("express");

var router = express.Router();

const authController = require("../controller/AuthController");

const { validate } = require("../validate/user");

const { check } = require("express-validator/check");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" , active : "active" });
});

router.get("/dang-nhap", authController.getFormLogin);

router.post("/dang-nhap", validate.validateRegisterUser, authController.postFormLogin);

router.get("/dang-ky", authController.getFormRegister);

router.post("/dang-ky", validate.validateRegisterUser, authController.postFormRegister); 


module.exports = router;
