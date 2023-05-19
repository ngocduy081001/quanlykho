var express = require("express");

var router = express.Router();

const ImportController = require("../controller/ImportController");

const { validate } = require("../validate/CategoryValidator");

const { check } = require("express-validator/check");

router.get("/danh-sach/", ImportController.gird);

router.get("/them", ImportController.create);

router.post("/them", ImportController.post);

// router.get("/sua/:id", ImportController.edit);

// router.post("/sua/:id", validate.create, ImportController.update);

// router.get("/xoa/:id", ImportController.delete);

// router.post("/xoa-multi", ImportController.delete_multi);

// router.get("/export-pdf", ImportController.export_pdf);

// router.get("/export-excel", ImportController.export_excel);

module.exports = router;
