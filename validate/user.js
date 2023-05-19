const express = require("express");
const { check } = require("express-validator/check");
var { validationResult } = require("express-validator");
let validateRegisterUser = [
  check("username",'Không được để trống').not().isEmpty(),
  check("password",'').not().isEmpty(),
  check("username",'Tên đăng nhập  tối thiểu 6 ký tự').isLength({min:4}),
  check("password",'Mật khẩu tối thiểu 6 ký tự').isLength({min:4}),
  (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
      return res.render("page/form/login", { errors: errors });

    } else next();
  },
];

let validate = {
  validateRegisterUser: validateRegisterUser,
};
module.exports = { validate };
