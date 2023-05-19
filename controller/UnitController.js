const { format } = require("morgan");
const UnitModel = require("../model/UnitModel");
const func_commom = require("../Helper/func_commom");
class UnitController {
  gird(req, res) {
    UnitModel.find()
      .then(function (data) {
        res.render("page/unit/grid", {
          data: data,
          edit: "/don-vi/sua",
          destroy: "/don-vi/xoa",
        });
      })
      .catch(function () {});
  }

  form(req, res, next) {
    res.render("page/unit/create", {
      title: "Thêm đơn vị",
      heading: "Tạo",
      module: "Đơn vị",
      action: "/don-vi/them/",
      input: [
        { id: "name", placeholder: "Tên đơn vị", title: "Tên", name: "name" },
      ],
      oldInput: req.oldInput,
    });
  }

  async post(req, res, next) {
    var data = await UnitModel.findOne().sort({ number: -1 });
    const name = req.body.name;
    var code = "";
    var count = 0;
    if (data !== null) {
      code = func_commom.gennateCodeProduct("DV", data.count + 1);
      count = data.count + 1;
    }else{
      code = func_commom.gennateCodeProduct("DV", 1);
      count = 1;
    }

    UnitModel.create({ name: name, code: code, count: count  })
      .then(function () {
        return res.redirect("/don-vi/danh-sach");
      })
      .catch();
  }

  edit(req, res, next) {
    const id = req.params.id;

    UnitModel.findById(id)
      .then(function (data) {
        if (data) {
          res.render("page/unit/edit", {
            title: "Sửa đơn vị",
            heading: "Sửa",
            module: "Đơn vị",
            action: "/don-vi/sua/" + id,
            input: [
              {
                id: "name",
                placeholder: "Tên đơn vị",
                title: "Tên",
                name: "name",
                value: data.name,
              },
            ],
          });
        }
      })
      .catch();
  }

  update(req, res, next) {
    UnitModel.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name })
      .then(function (data) {
        if (data) {
          return res.redirect("/don-vi/danh-sach");
        }
      })
      .catch();
  }

  delete(req, res, next) {
    UnitModel.findByIdAndDelete({ _id: req.params.id })
      .then(function (data) {
        if (data) {
          return res.redirect("/don-vi/danh-sach");
        }
      })
      .catch();
  }
}

module.exports = new UnitController();
