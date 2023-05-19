var express = require("express");

var router = express.Router();

const warehouseController = require("../controller/WarehouseController");

const { validate } = require("../validate/WareHouseValidator");

const { check } = require("express-validator/check");

router.get("/danh-sach/", warehouseController.gird);

router.get("/them", warehouseController.form);

router.post("/them", validate.create, warehouseController.post);

router.get("/sua/:id", warehouseController.edit);

router.post("/sua/:id", validate.create, warehouseController.update);

router.get("/xoa/:id", warehouseController.delete);

router.post("/xoa-multi", warehouseController.delete_multi);

router.get("/export-pdf", warehouseController.export_pdf);

router.get("/export-excel", warehouseController.export_excel);

//api

router.get("/api/a", warehouseController.gird);

module.exports = router;
