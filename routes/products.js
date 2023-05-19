var express = require("express");

var router = express.Router();

var upload = require('../middleware/uploadImage');

const productController = require("../controller/ProductController");

const { validate } = require("../validate/ProductValidator");

const { check } = require("express-validator/check");

var checkAuth = require("../middleware/checkUser")

router.get("/danh-sach/",productController.gird);

router.get("/them", productController.form);

router.post("/them", [ upload.single('product'), validate.create], productController.post);

router.get("/sua/:id", productController.edit);

router.post("/sua/:id",[ upload.single('product'), validate.create], productController.update);

router.get("/xoa/:id", productController.delete);

router.post("/tim-kiem/", productController.searchProduct);

router.get("/search/:id", productController.searchProductToCode);

// router.post("/xoa-multi", productController.delete_multi);

// router.get("/export-pdf", productController.export_pdf);

// router.get("/export-excel", productController.export_excel);

//api



module.exports = router;
