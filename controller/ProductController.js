const ProductModel = require("../model/ProductModel");

const CategoryModel = require("../model/CategoryModel");

const SlupplierModel = require("../model/SupplierModel");

const UnitModel = require("../model/UnitModel");

const func_commom = require("../Helper/func_commom");

var url = require("url");

const request = require("request");

const SupplierModel = require("../model/SupplierModel");

const WareHouseModel = require("../model/WareHouseModel");

class ProductController {
  async gird(req, res) {
    console.log(req.session);
    var url_parts = url.parse(req.url, true);

    var query = url_parts.query;

    var type_route = query.type;

    let perPage = 10;

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

    ProductModel.countDocuments()
      .then(function (data) {
        let all = data;
        ProductModel.find({
          name: new RegExp(search, "i"),
        })
          .then(function (data) {
            let count_data = data.length;
            ProductModel.find({
              name: new RegExp(search, "i"),
            })
              .populate("unit_id")
              .populate("supplier_id")
              .populate("cat_id")
              .sort(action)
              .skip(perPage * page - perPage)
              .limit(perPage)
              .then(function (data) {
                if (type_route != 1 && typeof type_route !== "undefined") {
                  res.render("page/product/grid", {
                    field: [
                      {
                        value: "code",
                        title: "Tên sản phẩm",
                      },
                      {
                        value: "name",
                        title: "Tên Sản phẩm",
                      },
                      {
                        value: "image",
                        title: "Hình ảnh",
                      },
                      {
                        value: "quantity",
                        title: "Số lượng",
                      },
                      {
                        value: "price_in",
                        title: "Giá mua",
                      },
                      {
                        value: "price_out",
                        title: "Giá bán",
                      },
                      {
                        value: "price_sale",
                        title: "Giá khuyến mãi",
                      },
                      {
                        value: "unit_id",
                        title: "Đơn vị",
                      },
                      {
                        value: "supplier",
                        title: "Nhà cung cấp",
                      },
                    ],
                    data: data,
                    edit: "/san-pham/sua",
                    destroy: "/san-pham/xoa",
                    create: "/san-pham/them",
                    export_pdf: "/san-pham/export-pdf",
                    export_excel: "/san-pham/export-excel",
                    export_word: "/san-pham/export-word",
                    pages: Math.ceil(all / perPage),
                    current: page,
                    module: "Sản phẩm",
                    heading: "Danh sách",
                    title: "Sản phẩm",
                    perPage: perPage,
                    page: page,
                    destroy_multi: "/san-pham/xoa-multi",
                  });
                }
                if (
                  typeof search !== "undefined" ||
                  Object.keys(query).length !== 0
                ) {
                  if (search != "") {
                    res.render("page/product/list-item", {
                      field: [
                        {
                          value: "code",
                          title: "Mã sản phẩm",
                        },
                        {
                          value: "name",
                          title: "Tên sản phẩm",
                        },
                        {
                          value: "image",
                          title: "Hình ảnh",
                        },
                        {
                          value: "quantity",
                          title: "Số lượng",
                        },
                        {
                          value: "price_in",
                          title: "Giá mua",
                        },
                        {
                          value: "price_out",
                          title: "Giá bán",
                        },
                        {
                          value: "price_sale",
                          title: "Giá khuyến mãi",
                        },
                        {
                          value: "unit_id",
                          title: "Đơn vị",
                        },
                        {
                          value: "supplier",
                          title: "Sản phẩm",
                        },
                      ],
                      data: data,
                      edit: "/san-pham/sua",
                      destroy: "/san-pham/xoa",
                      create: "/san-pham/them",
                      pages: Math.ceil(count_data / perPage),
                      current: page,
                      module: "Sản phẩm",
                      heading: "Danh sách",
                      count: data.length,
                      title: "Sản phẩm",
                      perPage: perPage,
                      page: page,
                      sort: sort,
                      destroy_multi: "/san-pham/xoa-multi",
                      export_pdf: "/san-pham/export-pdf",
                      export_excel: "/san-pham/export-excel",
                      export_word: "/san-pham/export-word",
                    });
                  } else {
                    res.render("page/product/list-item", {
                      field: [
                        {
                          value: "code",
                          title: "Mã sản phẩm",
                        },
                        {
                          value: "name",
                          title: "Tên sản phẩm",
                        },
                        {
                          value: "image",
                          title: "Hình ảnh",
                        },
                        {
                          value: "quantity",
                          title: "Số lượng",
                        },
                        {
                          value: "price_in",
                          title: "Giá mua",
                        },
                        {
                          value: "price_out",
                          title: "Giá bán",
                        },
                        {
                          value: "price_sale",
                          title: "Giá khuyến mãi",
                        },
                        {
                          value: "unit_id",
                          title: "Đơn vị",
                        },
                        {
                          value: "supplier",
                          title: "Sản phẩm",
                        },
                      ],
                      data: data,
                      edit: "/san-pham/sua",
                      destroy: "/san-pham/xoa",
                      create: "/san-pham/them",
                      pages: Math.ceil(count_data / perPage),
                      current: page,
                      module: "Sản phẩm",
                      heading: "Danh sách",
                      count: data.length,
                      title: "Sản phẩm",
                      perPage: perPage,
                      page: page,
                      sort: sort,
                      destroy_multi: "/san-pham/xoa-multi",
                      export_pdf: "/san-pham/export-pdf",
                      export_excel: "/san-pham/export-excel",
                      export_word: "/san-pham/export-word",
                    });
                  }
                } else {
                  res.render("page/product/grid", {
                    field: [
                      {
                        value: "code",
                        title: "Mã sản phẩm",
                      },
                      {
                        value: "name",
                        title: "Tên sản phẩm",
                      },
                      {
                        value: "image",
                        title: "Hình ảnh",
                      },
                      {
                        value: "quantity",
                        title: "Số lượng",
                      },
                      {
                        value: "price_in",
                        title: "Giá mua",
                      },
                      {
                        value: "price_out",
                        title: "Giá bán",
                      },
                      {
                        value: "price_sale",
                        title: "Giá khuyến mãi",
                      },
                      {
                        value: "unit_id",
                        title: "Đơn vị",
                      },
                      {
                        value: "supplier",
                        title: "Sản phẩm",
                      },
                    ],
                    data: data,
                    edit: "/san-pham/sua",
                    destroy: "/san-pham/xoa",
                    create: "/san-pham/them",
                    pages: Math.ceil(all / perPage),
                    current: page,
                    module: "Sản phẩm",
                    heading: "Danh sách",
                    title: "Sản phẩm",
                    perPage: perPage,
                    page: page,
                    destroy_multi: "/san-pham/xoa-multi",
                    export_pdf: "/san-pham/export-pdf",
                    export_excel: "/san-pham/export-excel",
                    export_word: "/san-pham/export-word",
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch();
      })
      .catch();
  }

  async form(req, res, next) {
    let category = await CategoryModel.find();

    let supplier = await SlupplierModel.find();

    let unit = await UnitModel.find();

    let warehouse = await WareHouseModel.find();

    res.render("page/product/create", {
      errors: req.flash("errors"),
      title: "Thêm sản phẩm",
      heading: "Tạo",
      module: "Sản phẩm",
      action: "/san-pham/them/",
      file: true,
      input: [
        {
          id: "code",
          placeholder: "Không nhập mã sản phẩm hệ thống sẽ tự tạo",
          title: "Mã sản phẩm",
          name: "code",
          type: "text",
        },
        {
          id: "name",
          placeholder: "Tên sản phẩm",
          title: "Tên",
          name: "name",
          type: "text",
        },
        {
          id: "category",
          placeholder: "Danh mục sản phẩm",
          title: "Danh mục sản phẩm",
          name: "category",
          type: "select",
          options: category,
        },
        {
          id: "unit",
          placeholder: "Đơn vị",
          title: "Đơn vị",
          name: "unit",
          type: "select",
          options: unit,
        },
        {
          id: "supplier",
          placeholder: "Nhà sản xuất",
          title: "Nhà sản xuất",
          name: "supplier",
          type: "select",
          options: supplier,
        },
        {
          id: "warehouse",
          placeholder: "Nhà kho",
          title: "Nhà kho",
          name: "warehouse",
          type: "select",
          options: warehouse,
        },
        {
          id: "price_in",
          placeholder: "Giá nhập",
          title: "Giá nhập",
          name: "price_in",
          type: "text",
          data_type: "currency",
        },
        ,
        {
          id: "price_out",
          placeholder: "Giá bán",
          title: "Giá bán",
          name: "price_out",
          type: "text",
          data_type: "currency",
        },
        ,
        {
          id: "price_sale",
          placeholder: "Giá giảm",
          title: "Giá giảm",
          name: "price_sale",
          type: "text",
          data_type: "currency",
        },
        {
          id: "product",
          placeholder: "Chọn ảnh",
          title: "Ảnh sản phẩm",
          name: "product",
          type: "file",
        },
        {
          id: "quantity",
          placeholder: "Số lượng",
          title: "Số lượng",
          name: "quantity",
          type: "number",
        },
      ],
      oldInput: req.oldInput,
    });
  }

  async post(req, res, next) {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price_in = req.body.price_in;
    const price_out = req.body.price_out;
    const price_sale = req.body.price_sale;

    const unit = await UnitModel.findOne({ code: req.body.unit }).exec();

    const supplier = await SupplierModel.findOne({ code: req.body.supplier });

    const category = await CategoryModel.findOne({ code: req.body.category });

    const warehouse = await WareHouseModel.findOne({
      code: req.body.warehouse,
    });

    const image = {
      data: req.file.filename,
      mimetype: req.file.mimetype,
    };

    const user_id = req.session.username;
    ProductModel.findOne()
      .sort({ _id: -1 })
      .then(function (data) {
        var code = 1;
        var id = 1;
        if (data !== null) {
          code = func_commom.gennateCodeProduct("SP", data._id);
          id = data._id + 1;
        } else {
          code = func_commom.gennateCodeProduct("SP", 1);
        }
        const options = {
          method: "POST",
          url: "http://127.0.0.1:8000/api/product/create",
          port: 443,
          headers: {
            Authorization:
              "Bearer " +
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY4MzM2MDYyMiwiZXhwIjoxNjgzMzY0MjIyLCJuYmYiOjE2ODMzNjA2MjIsImp0aSI6IjNzS3VtVEtMcWlPcWlncXIiLCJzdWIiOjEsInBydiI6IjM2NTBjYTk1MDk4ZDRjZjRhZTc5MDAyNmE1Nzg1NTMwYzY0ODk2MjUifQ.IhB2vcBYXw1F2nfHQ1RiPHXHyleTh9T6oLnyBsPfiOc",
          },
          formData: {},
        };
        ProductModel.create({
          _id: id,
          code: code,
          name: name,
          quantity: quantity,
          price_in: price_in,
          price_out: price_out,
          price_sale: price_sale,
          unit_id: unit._id,
          supplier_id: supplier._id,
          cat_id: category._id,
          image: image,
          warehouse_id: warehouse._id,
          user_id: user_id,
        })
          .then(() => {
            return res.redirect("/san-pham/danh-sach");
          })
          .catch();

        // request(options, function (err, response, body) {
        //   if (response.statusCode == 200) {
        //   // them sp
        //   }
        // return res.redirect("/san-pham/danh-sach");
        // });
      })
      .catch();
  }

  async edit(req, res, next) {
    const id = req.params.id;
    let category = await CategoryModel.find();

    let supplier = await SlupplierModel.find();

    let unit = await UnitModel.find();

    let warehouse = await WareHouseModel.find();
    ProductModel.findById(id)
      .populate("unit_id")
      .populate("supplier_id")
      .populate("cat_id")
      .populate("warehouse_id")
      .then(function (data) {
        if (data) {
          res.render("page/product/edit", {
            title: "Sửa sản phẩm",
            heading: "Sửa",
            module: "Sản phẩm",
            action: "/san-pham/sua/" + id,
            input: [
              {
                id: "name",
                placeholder: "Tên sản phẩm",
                title: "Tên sản phẩm",
                name: "name",
                value: data.name,
                type: "text",
              },
              {
                id: "quantity",
                placeholder: "Số lượng",
                title: "Số lượng",
                name: "quantity",
                value: data.quantity,
                type: "text",
              },
              {
                id: "price_in",
                placeholder: "Giá nhập",
                title: "Giá bán",
                name: "price_in",
                value: data.price_in,
                type: "text",
              },
              {
                id: "price_out",
                placeholder: "Giá bán",
                title: "Giá bán",
                name: "price_out",
                value: data.price_out,
                type: "text",
              },
              {
                id: "price_sale",
                placeholder: "Giá giảm",
                title: "Giá bán",
                name: "price_sale",
                value: data.price_sale,
                type: "text",
              },
              {
                id: "unit_id",
                placeholder: "Đơn vị",
                title: "Đơn vị",
                name: "unit_id",
                value: data.unit_id.code,
                type: "select",
                option: unit,
              },
              {
                id: "supplier_id",
                placeholder: "Nhà cung cấp",
                title: "Nhà cung cấp",
                name: "supplier_id",
                value: data.supplier_id.code,
                type: "select",
                option: supplier,
              },
              {
                id: "cat_id",
                placeholder: "Danh mục",
                title: "Danh mục",
                name: "cat_id",
                value: data.cat_id.code,
                type: "select",
                option: category,
              },
              {
                id: "warehouse_id",
                placeholder: "Nhà kho",
                title: "Nhà kho",
                name: "warehouse_id",
                value: data.warehouse_id.code,
                type: "select",
                option: warehouse,
              },
            ],
          });
        }
      })
      .catch();
  }

  async update(req, res, next) {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price_in = req.body.price_in;
    const price_out = req.body.price_out;
    const price_sale = req.body.price_sale;

    const unit = await UnitModel.findOne({ code: req.body.unit_id }).exec();

    const supplier = await SupplierModel.findOne({
      code: req.body.supplier_id,
    });

    const category = await CategoryModel.findOne({ code: req.body.cat_id });

    const warehouse = await WareHouseModel.findOne({
      code: req.body.warehouse_id,
    });
    let image = {};
    console.log(req.file);
    if (typeof req.file !== "undefined") {
      image = {
        data: req.file.filename,
        mimetype: req.file.mimetype,
      };
      ProductModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: name,
          quantity: quantity,
          price_in: price_in,
          price_out: price_out,
          price_sale: price_sale,
          unit_id: unit._id,
          supplier_id: supplier._id,
          cat_id: category._id,
          image: image,
          warehouse_id: warehouse._id,
          user_id: user_id,
        }
      )
        .then(function (data) {
          if (data) {
            return res.redirect("/san-pham/danh-sach");
          }
        })
        .catch();
    } else {
      ProductModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: name,
          quantity: quantity,
          price_in: price_in,
          price_out: price_out,
          price_sale: price_sale,
          unit_id: unit._id,
          supplier_id: supplier._id,
          cat_id: category._id,
          warehouse_id: warehouse._id,
        }
      )
        .then(function (data) {
          if (data) {
            return res.redirect("/san-pham/danh-sach");
          }
        })
        .catch();
    }

    const user_id = req.session.username;
  }

  delete(req, res, next) {
    ProductModel.findByIdAndDelete({ _id: req.params.id })
      .then(function (data) {
        if (data) {
          res.status(200).json({ status: 200 });
          //   return res.redirect("/kho-bai/danh-sach");
        }
      })
      .catch();
  }

  async searchProduct(req, res, next) {
    var search = req.body.product;
    var product_result = req.body.product_result;
    ProductModel.find({
      name: new RegExp(search, "gi"),
      code: {
        $nin: product_result,
      },
    }).then(function (data) {
      return res.json(data);
    });
  }

  async searchProductToCode(req, res, next) {
    const code = req.params.id;

    ProductModel.findOne({ code: code })
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {});
  }
}
module.exports = new ProductController();
