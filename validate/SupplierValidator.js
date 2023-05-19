const express = require("express");
const { check } = require("express-validator/check");
var { validationResult } = require("express-validator");
let create = [
  check("name",'Không được để trống').not().isEmpty(),

  (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
      return res.render("page/unit/form", { errors: errors, title: "Thêm đơn vị",
      heading: "Tạo",
      module: "Đơn vị",
      action: "/don-vi/them/a",
      input: [{ id: "name" , placeholder : 'Tên đơn vị', title : 'Tên' ,name : 'name'}],
    });

    } else next();
  },
];

let validate = {
  create: create,
};
module.exports = { validate };
