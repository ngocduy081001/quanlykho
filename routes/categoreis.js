var express = require("express");

var router = express.Router();

const categoryController = require("../controller/CategoryController");

const { validate } = require("../validate/CategoryValidator");

const { check } = require("express-validator/check");

router.get("/danh-sach/", categoryController.gird);

router.get("/them", categoryController.form);

router.post("/them", validate.create, categoryController.post);

router.get("/sua/:id", categoryController.edit);

router.post("/sua/:id", validate.create, categoryController.update);

router.get("/xoa/:id", categoryController.delete);

router.post("/xoa-multi", categoryController.delete_multi);

router.get("/export-pdf", categoryController.export_pdf);

router.get("/export-excel", categoryController.export_excel);

//api

router.get("/api/a", categoryController.gird);

module.exports = router;
