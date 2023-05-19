var express = require("express");

var router = express.Router();

const unitController = require("../controller/UnitController");

const { validate } = require("../validate/UnitValidator");

 const { check } = require("express-validator/check");

router.get("/danh-sach", unitController.gird);

router.get("/them", unitController.form);

router.post("/them", validate.create , unitController.post);

router.get("/sua/:id", unitController.edit);

router.post("/sua/:id",validate.create, unitController.update);

router.get("/xoa/:id", unitController.delete);

module.exports = router;