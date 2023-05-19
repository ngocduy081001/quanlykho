const express = require("express");
const { check } = require("express-validator/check");
var { validationResult, body } = require("express-validator");
const { checkSchema } = require("express-validator/check");
const ProductModel = require("../model/ProductModel");

const CategoryModel = require("../model/CategoryModel");

const SlupplierModel = require("../model/SupplierModel");

const UnitModel = require("../model/UnitModel");

let create = [
  check("name", "Tên sản phẩm không được để trống").not().isEmpty(),
  check("quantity", "Số lượng không được để trống").not().isEmpty(),
  check("price_in", "Giá nhập không được để trống").not().isEmpty(),
  check("price_out", "Giá bán không được để trống").not().isEmpty(),
  check("price_out", "Giá bán lớn hơn giá nhập").custom(
    (value, { req }) => value >= req.body.price_in
  ),
  check("price_sale", "Giảm giá nhỏ hơn gái bán").custom(
    (value, { req }) => value < req.body.price_out
  ),

  checkSchema({
    product: {
      custom: {
        options: (value, { req, path }) => !req.file.product,
        errorMessage: "Bạn chư tải hình ảnh sản phẩm lên",
      },
    },
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors", errors.errors);
      return res.redirect("/san-pham/them");
    }
    next();
  },
];

let validate = {
  create: create,
};
module.exports = { validate };
