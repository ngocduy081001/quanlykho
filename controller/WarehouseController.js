const { format } = require("morgan");
const warehouseModel = require("../model/WareHouseModel");
var url = require("url");
const { log } = require("console");
const { body } = require("express-validator");
const { type } = require("os");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const func_commom = require("../Helper/func_commom");

var excel = require("excel4node");

const { json } = require("express");

class warehouseController {
  gird(req, res) {
    var url_parts = url.parse(req.url, true);

    var query = url_parts.query;

    var type_route = query.type;

    let perPage = 3;

    var page = query.trang || 1;

    var search = query.search;

    var sort = query.sort_type;

    if (sort === "asc") {
      sort = 1;
    } else {
      sort = -1;
    }

    let field = query.sort_field;

    let action = {};

    action[field] = sort;

    delete query.trang;

    warehouseModel
      .countDocuments()
      .then(function (data) {
        let all = data;
        warehouseModel
          .find({
            name: new RegExp(search, "i"),
          })
          .sort(action)
          .then(function (data) {
            let count_data = data.length;
            warehouseModel
              .find({
                name: new RegExp(search, "i"),
              })
              .sort(action)
              .skip(perPage * page - perPage)
              .limit(perPage)
              .then(function (data) {
                if (type_route != 1 && typeof type_route !== "undefined") {
                  res.render("page/warehouse/grid", {
                    field: [
                      {
                        value: "name",
                        title: "Tên kho bãi",
                      },
                    ],
                    data: data,
                    edit: "/kho-bai/sua",
                    destroy: "/kho-bai/xoa",
                    create: "/kho-bai/them",
                    export_pdf: "/kho-bai/export-pdf",
                    export_excel: "/kho-bai/export-excel",
                    export_word: "/kho-bai/export-word",
                    pages: Math.ceil(all / perPage),
                    current: page,
                    module: "Kho bãi",
                    heading: "Danh sách",
                    title: "Kho bãi",
                    perPage: perPage,
                    page: page,
                    destroy_multi: "/kho-bai/xoa-multi",
                  });
                }
                if (
                  typeof search !== "undefined" ||
                  Object.keys(query).length !== 0
                ) {
                  if (search != "") {
                    res.render("page/warehouse/list-item", {
                      field: [
                        {
                          value: "name",
                          title: "Tên kho bãi",
                        },
                      ],
                      data: data,
                      edit: "/kho-bai/sua",
                      destroy: "/kho-bai/xoa",
                      create: "/kho-bai/them",
                      pages: Math.ceil(count_data / perPage),
                      current: page,
                      module: "Kho bãi",
                      heading: "Danh sách",
                      count: data.length,
                      title: "Kho bãi",
                      perPage: perPage,
                      page: page,
                      sort: sort,
                      destroy_multi: "/kho-bai/xoa-multi",
                      export_pdf: "/kho-bai/export-pdf",
                      export_excel: "/kho-bai/export-excel",
                      export_word: "/kho-bai/export-word",
                    });
                  } else {
                    res.render("page/warehouse/list-item", {
                      field: [
                        {
                          value: "name",
                          title: "Tên kho bãi",
                        },
                      ],
                      data: data,
                      edit: "/kho-bai/sua",
                      destroy: "/kho-bai/xoa",
                      create: "/kho-bai/them",
                      pages: Math.ceil(count_data / perPage),
                      current: page,
                      module: "Kho bãi",
                      heading: "Danh sách",
                      count: data.length,
                      title: "Kho bãi",
                      perPage: perPage,
                      page: page,
                      sort: sort,
                      destroy_multi: "/kho-bai/xoa-multi",
                      export_pdf: "/kho-bai/export-pdf",
                      export_excel: "/kho-bai/export-excel",
                      export_word: "/kho-bai/export-word",
                    });
                  }
                } else {
                  res.render("page/warehouse/grid", {
                    field: [
                      {
                        value: "name",
                        title: "Tên kho bãi",
                      },
                    ],
                    data: data,
                    edit: "/kho-bai/sua",
                    destroy: "/kho-bai/xoa",
                    create: "/kho-bai/them",
                    pages: Math.ceil(all / perPage),
                    current: page,
                    module: "Kho bãi",
                    heading: "Danh sách",
                    title: "Kho bãi",
                    perPage: perPage,
                    page: page,
                    destroy_multi: "/kho-bai/xoa-multi",
                    export_pdf: "/kho-bai/export-pdf",
                    export_excel: "/kho-bai/export-excel",
                    export_word: "/kho-bai/export-word",
                  });
                }
              })
              .catch(function () {});
          })
          .catch();
      })
      .catch();
  }

  form(req, res, next) {
    res.render("page/warehouse/create", {
      title: "Thêm Kho bãi",
      heading: "Tạo",
      module: "Kho bãi",
      action: "/kho-bai/them/",
      input: [
        {
          id: "name",
          placeholder: "Tên kho bãi",
          title: "Tên",
          name: "name",
          type: "text",
        },
      ],
      oldInput: req.oldInput,
    });
  }

  async post(req, res, next) {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;

    var data = await warehouseModel.findOne().sort({ number: -1 });
 
    var code = "";
    var count = 0;
    if (data !== null) {
      code = func_commom.gennateCodeProduct("KH", data.count + 1);
      count = data.count + 1;
    } else {
      code = func_commom.gennateCodeProduct("KH", 1);
      count = 1;
    }
    warehouseModel
      .create({
        name: name,
        phone: phone,
        email: email,
        address: address,
        code :code
      })
      .then(function () {
        return res.redirect("/kho-bai/danh-sach");
      })
      .catch();
  }

  edit(req, res, next) {
    const id = req.params.id;
    warehouseModel
      .findById(id)
      .then(function (data) {
        if (data) {
          res.render("page/warehouse/edit", {
            title: "Sửa Kho bãi",
            heading: "Sửa",
            module: "Kho bãi",
            action: "/kho-bai/sua/" + id,
            input: [
              {
                id: "name",
                placeholder: "Tên kho bãi",
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
    warehouseModel
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
        }
      )
      .then(function (data) {
        if (data) {
          return res.redirect("/kho-bai/danh-sach");
        }
      })
      .catch();
  }

  delete(req, res, next) {
    warehouseModel
      .findByIdAndDelete({ _id: req.params.id })
      .then(function (data) {
        if (data) {
          res.status(200).json({ status: 200 });
          //   return res.redirect("/kho-bai/danh-sach");
        }
      })
      .catch();
  }

  delete_multi(req, res, next) {
    warehouseModel
      .deleteMany({ _id: req.body.data })
      .then(function (data) {
        if (data) {
          res.status(200).json({ status: 200 });
          //   return res.redirect("/kho-bai/danh-sach");
        }
      })
      .catch();
  }

  async export_pdf(req, res, next) {
    warehouseModel
      .find()
      .then(function (data) {
        let browser;
        (async () => {
          browser = await puppeteer.launch();
          const [page] = await browser.pages();
          const html = await ejs.renderFile("./export/pdf/warehouse.ejs", {
            user: data,
          });
          await page.setContent(html);
          const pdf = await page.pdf({ format: "A4" });
          res.contentType("application/pdf");

          // optionally:
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=invoice.pdf"
          );

          res.send(pdf);
        })()
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          })
          .finally(() => browser?.close());
      })
      .catch();
  }

  async export_excel(req, res, next) {
    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet("Sheet 1");
    var worksheet2 = workbook.addWorksheet("Sheet 2");

    // Create a reusable style
    var style = workbook.createStyle({
      font: {
        color: "#FF0800",
        size: 12,
      },
      numberFormat: "$#,##0.00; ($#,##0.00); -",
    });

    // Set value of cell A1 to 100 as a number type styled with paramaters of style
    worksheet.cell(1, 1).number(100).style(style);

    // Set value of cell B1 to 300 as a number type styled with paramaters of style
    worksheet.cell(1, 2).number(200).style(style);

    // Set value of cell C1 to a formula styled with paramaters of style
    worksheet.cell(1, 3).formula("A1 + B1").style(style);

    // Set value of cell A2 to 'string' styled with paramaters of style
    worksheet.cell(2, 1).string("string").style(style);

    // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
    worksheet
      .cell(3, 1)
      .bool(true)
      .style(style)
      .style({ font: { size: 14 } });

    workbook.write("Excel.xlsx");

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Excel.xlsx"
    );

    await workbook.xlsx.write(response);
    response.end();
  }

  async export_word(req, res, next) {}
}

module.exports = new warehouseController();
