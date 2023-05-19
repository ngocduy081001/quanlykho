const ImportModel = require("../model/ImportModel");

class ImportController {
  async gird(req, res) {
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

  async create(req, res) {
    res.render("page/import/create", {
      title: "Tạo phiếu nhập",
      module: "Nhập hàng",
      heading: "Tạo phiếu",
    });
  }
  async post(req, res) {
    var data = req.body.a;
    data.forEach((element) => {
      console.log(element);
    });
  }
}

module.exports = new ImportController();
