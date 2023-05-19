const SupplierModel = require("../model/SupplierModel");

var url = require("url");

const ejs = require("ejs");

const puppeteer = require("puppeteer");

var excel = require("excel4node");

const func_commom = require("../Helper/func_commom");

class supplierController {
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

    SupplierModel.countDocuments()
      .then(function (data) {
        let all = data;
        SupplierModel.find({
          name: new RegExp(search, "i"),
        })
          .sort(action)
          .then(function (data) {
            let count_data = data.length;
            SupplierModel.find({
              name: new RegExp(search, "i"),
            })
              .sort(action)
              .skip(perPage * page - perPage)
              .limit(perPage)
              .then(function (data) {
                if (type_route != 1 && typeof type_route !== "undefined") {
                  res.render("page/supplier/grid", {
                    field: [
                      {
                        value: "address",
                        title: "Địa chỉ",
                      },
                      {
                        value: "name",
                        title: "Tên Nhà cung cấp",
                      },
                      {
                        value: "email",
                        title: "Email",
                      },
                      {
                        value: "phone",
                        title: "Số điện thoại",
                      },
                    ],
                    data: data,
                    edit: "/nha-cung-cap/sua",
                    destroy: "/nha-cung-cap/xoa",
                    create: "/nha-cung-cap/them",
                    export_pdf: "/nha-cung-cap/export-pdf",
                    export_excel: "/nha-cung-cap/export-excel",
                    export_word: "/nha-cung-cap/export-word",
                    pages: Math.ceil(all / perPage),
                    current: page,
                    module: "Nhà cung cấp",
                    heading: "Danh sách",
                    title: "Nhà cung cấp",
                    perPage: perPage,
                    page: page,
                    destroy_multi: "/nha-cung-cap/xoa-multi",
                  });
                }
                if (
                  typeof search !== "undefined" ||
                  Object.keys(query).length !== 0
                ) {
                  if (search != "") {
                    res.render("page/supplier/list-item", {
                      field: [
                        {
                          value: "address",
                          title: "Địa chỉ",
                        },
                        {
                          value: "name",
                          title: "Tên Nhà cung cấp",
                        },
                        {
                          value: "email",
                          title: "Email",
                        },
                        {
                          value: "phone",
                          title: "Số điện thoại",
                        },
                      ],
                      data: data,
                      edit: "/nha-cung-cap/sua",
                      destroy: "/nha-cung-cap/xoa",
                      create: "/nha-cung-cap/them",
                      pages: Math.ceil(count_data / perPage),
                      current: page,
                      module: "Nhà cung cấp",
                      heading: "Danh sách",
                      count: data.length,
                      title: "Nhà cung cấp",
                      perPage: perPage,
                      page: page,
                      sort: sort,
                      destroy_multi: "/nha-cung-cap/xoa-multi",
                      export_pdf: "/nha-cung-cap/export-pdf",
                      export_excel: "/nha-cung-cap/export-excel",
                      export_word: "/nha-cung-cap/export-word",
                    });
                  } else {
                    res.render("page/supplier/list-item", {
                      field: [
                        {
                          value: "address",
                          title: "Địa chỉ",
                        },
                        {
                          value: "name",
                          title: "Tên Nhà cung cấp",
                        },
                        {
                          value: "email",
                          title: "Email",
                        },
                        {
                          value: "phone",
                          title: "Số điện thoại",
                        },
                      ],
                      data: data,
                      edit: "/nha-cung-cap/sua",
                      destroy: "/nha-cung-cap/xoa",
                      create: "/nha-cung-cap/them",
                      pages: Math.ceil(count_data / perPage),
                      current: page,
                      module: "Nhà cung cấp",
                      heading: "Danh sách",
                      count: data.length,
                      title: "Nhà cung cấp",
                      perPage: perPage,
                      page: page,
                      sort: sort,
                      destroy_multi: "/nha-cung-cap/xoa-multi",
                      export_pdf: "/nha-cung-cap/export-pdf",
                      export_excel: "/nha-cung-cap/export-excel",
                      export_word: "/nha-cung-cap/export-word",
                    });
                  }
                } else {
                  res.render("page/supplier/grid", {
                    field: [
                      {
                        value: "address",
                        title: "Địa chỉ",
                      },
                      {
                        value: "name",
                        title: "Tên Nhà cung cấp",
                      },
                      {
                        value: "email",
                        title: "Email",
                      },
                      {
                        value: "phone",
                        title: "Số điện thoại",
                      },
                    ],
                    data: data,
                    edit: "/nha-cung-cap/sua",
                    destroy: "/nha-cung-cap/xoa",
                    create: "/nha-cung-cap/them",
                    pages: Math.ceil(all / perPage),
                    current: page,
                    module: "Nhà cung cấp",
                    heading: "Danh sách",
                    title: "Nhà cung cấp",
                    perPage: perPage,
                    page: page,
                    destroy_multi: "/nha-cung-cap/xoa-multi",
                    export_pdf: "/nha-cung-cap/export-pdf",
                    export_excel: "/nha-cung-cap/export-excel",
                    export_word: "/nha-cung-cap/export-word",
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
    res.render("page/supplier/create", {
      title: "Thêm Nhà cung cấp",
      heading: "Tạo",
      module: "Nhà cung cấp",
      action: "/nha-cung-cap/them/",
      input: [
        {
          id: "name",
          placeholder: "Tên nhà cung cấp",
          title: "Tên",
          name: "name",
          type: "text",
        },
        {
          id: "phone",
          placeholder: "Nhập số điện thoại",
          title: "Điện thoại",
          name: "phone",
          type: "text",
        },
        {
          id: "email",
          placeholder: "Nhập địa chỉ email",
          title: "Email",
          name: "email",
          type: "email",
        },
        {
          id: "address",
          placeholder: "Nhập địa chỉ ",
          title: "Địa chỉ",
          name: "address",
          type: "string",
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
    const data = await SupplierModel.findOne().sort({ number: -1 });
    var code = "";
    var count = 0;
    if (data !== null) {
      code = func_commom.gennateCodeProduct("NCC", data.count + 1);
      count = data.count + 1;
    } else {
      code = func_commom.gennateCodeProduct("NCC", 1);
      count = 1;
    }
    SupplierModel.create({
      name: name,
      phone: phone,
      email: email,
      address: address,
      code: code,
      count: count,
    })
      .then(function () {
        return res.redirect("/nha-cung-cap/danh-sach");
      })
      .catch();
  }

  edit(req, res, next) {
    const id = req.params.id;
    SupplierModel.findById(id)
      .then(function (data) {
        if (data) {
          res.render("page/supplier/edit", {
            title: "Sửa nhà cung cấp",
            heading: "Sửa",
            module: "Nhà cung cấp",
            action: "/nha-cung-cap/sua/" + id,
            input: [
              {
                id: "name",
                placeholder: "Tên nhà cung cấp",
                title: "Tên",
                name: "name",
                value: data.name,
              },
              {
                id: "email",
                placeholder: "Nhập địa chỉ email",
                title: "Email",
                name: "email",
                value: data.email,
              },
              {
                id: "phone",
                placeholder: "Nhập số điện thoại",
                title: "Số điện thoại",
                name: "phone",
                value: data.phone,
              },
              {
                id: "address",
                placeholder: "Nhập địa chỉ ",
                title: "Địa chỉ",
                name: "address",
                value: data.address,
              },
            ],
          });
        }
      })
      .catch();
  }

  update(req, res, next) {
    SupplierModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
      }
    )
      .then(function (data) {
        if (data) {
          return res.redirect("/nha-cung-cap/danh-sach");
        }
      })
      .catch();
  }

  delete(req, res, next) {
    SupplierModel.findByIdAndDelete({ _id: req.params.id })
      .then(function (data) {
        if (data) {
          res.status(200).json({ status: 200 });
          //   return res.redirect("/nha-cung-cap/danh-sach");
        }
      })
      .catch();
  }

  delete_multi(req, res, next) {
    SupplierModel.deleteMany({ _id: req.body.data })
      .then(function (data) {
        if (data) {
          res.status(200).json({ status: 200 });
          //   return res.redirect("/nha-cung-cap/danh-sach");
        }
      })
      .catch();
  }

  async export_pdf(req, res, next) {
    SupplierModel.find()
      .then(function (data) {
        let browser;
        (async () => {
          browser = await puppeteer.launch();
          const [page] = await browser.pages();
          const html = await ejs.renderFile("./export/pdf/supplier.ejs", {
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

module.exports = new supplierController();
