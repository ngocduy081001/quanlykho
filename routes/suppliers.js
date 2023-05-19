var express = require("express");

var router = express.Router();

const supplierController = require("../controller/SupplierController");

const { validate } = require("../validate/SupplierValidator");

const { check } = require("express-validator/check");

router.get("/danh-sach/", supplierController.gird);

router.get("/them", supplierController.form);

router.post("/them", validate.create, supplierController.post);

router.get("/sua/:id", supplierController.edit);

router.post("/sua/:id", validate.create, supplierController.update);

router.get("/xoa/:id", supplierController.delete);

router.post("/xoa-multi", supplierController.delete_multi);

router.get("/export-pdf", supplierController.export_pdf);

router.get("/export-excel", supplierController.export_excel);

//api

router.get("/api/a", supplierController.gird);

module.exports = router;
