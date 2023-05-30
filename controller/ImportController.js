const ImportModel = require("../model/ImportModel");
const WareHouseModel = require("../model/WareHouseModel");
const ProductModel = require("../model/ProductModel");
const func_commom = require("../Helper/func_commom");
const UserModel = require("../model/UserModel");
var url = require("url");
const { render } = require("ejs");
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

    const count_all = await ImportModel.countDocuments();

    const count_search = await ImportModel.find();

    let count_data = count_search.length;
    ImportModel.find()
      .populate("warehouse_id")
      .populate("user")
      .sort(action)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then(function (data) {
        if (type_route != 1 && typeof type_route !== "undefined") {
          res.render("page/import/grid", {
            data: data,
            view: "/nhap-hang/xem",
            edit: "/nhap-hang/sua",
            destroy: "/nhap-hang/xoa",
            create: "/nhap-hang/them",
            export_pdf: "/nhap-hang/export-pdf",
            export_excel: "/nhap-hang/export-excel",
            export_word: "/nhap-hang/export-word",
            pages: Math.ceil(count_all / perPage),
            current: page,
            module: "Sản phẩm",
            heading: "Danh sách",
            title: "Sản phẩm",
            perPage: perPage,
            page: page,
            destroy_multi: "/nhap-hang/xoa-multi",
          });
        }
        if (typeof search !== "undefined" || Object.keys(query).length !== 0) {
          if (search != "") {
            res.render("page/import/list-item", {
              data: data,
              view: "/nhap-hang/xem",
              edit: "/nhap-hang/sua",
              destroy: "/nhap-hang/xoa",
              create: "/nhap-hang/them",
              pages: Math.ceil(count_data / perPage),
              current: page,
              module: "Sản phẩm",
              heading: "Danh sách",
              count: count_data,
              title: "Sản phẩm",
              perPage: perPage,
              page: page,
              sort: sort,
              destroy_multi: "/nhap-hang/xoa-multi",
              export_pdf: "/nhap-hang/export-pdf",
              export_excel: "/nhap-hang/export-excel",
              export_word: "/nhap-hang/export-word",
            });
          } else {
            res.render("page/import/list-item", {
              data: data,
              view: "/nhap-hang/xem",
              edit: "/nhap-hang/sua",
              destroy: "/nhap-hang/xoa",
              create: "/nhap-hang/them",
              pages: Math.ceil(count_data / perPage),
              current: page,
              module: "Sản phẩm",
              heading: "Danh sách",
              count: count_data,
              title: "Sản phẩm",
              perPage: perPage,
              page: page,
              sort: sort,
              destroy_multi: "/nhap-hang/xoa-multi",
              export_pdf: "/nhap-hang/export-pdf",
              export_excel: "/nhap-hang/export-excel",
              export_word: "/nhap-hang/export-word",
            });
          }
        } else {
          res.render("page/import/grid", {
            data: data,
            view: "/nhap-hang/xem",
            edit: "/san-pham/sua",
            destroy: "/san-pham/xoa",
            create: "/san-pham/them",
            pages: Math.ceil(count_all / perPage),
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
  }

  async create(req, res) {
    const warehouse = await WareHouseModel.find({});
    res.render("page/import/create", {
      title: "Tạo phiếu nhập",
      module: "Nhập hàng",
      heading: "Tạo phiếu",
      warehouse: warehouse,
    });
  }
  async post(req, res) {
    const data = await ImportModel.findOne().sort({ _id: -1 });
    var code = 1;
    var count = 1;
    if (data != null) {
      count = data.count + 1;
      code = func_commom.gennateCodeProduct("PN", count);
    } else {
      code = func_commom.gennateCodeProduct("PN", 1);
    }

    const user = await UserModel.findOne({ username: req.session.username });
    ImportModel.create({
      code: code,
      count: count,
      warehouse_id: req.body.kho_hang,
      product: req.body.product,
      user: user._id,

      tong_cong: req.body.tong_cong,
      thanh_toan: req.body.thanh_toan,
      cong_no: req.body.cong_no,
      tien_hang: req.body.tien_hang,
      date: req.body.date,
    });

    req.body.product.forEach(async function (element) {
      var p = await ProductModel.findOne({ code: element.product });
      var quantity = parseInt(element.quantity) + p.quantity;

      var a = await ProductModel.updateOne(
        { code: element.product },
        {
          quantity: quantity,
          price_in: element.price,
        }
      );
      return res.json({
        status: 200,
      });
    });
  }

  async view(req, res) {
    const product = await ImportModel.aggregate([
      { $addFields: { "a": { "$toObjectId": "$warehouse_id" } } },
      {
        $match: {
          code: req.params.id,
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "product.product",
          foreignField: "code",
          as: "info_product",
        },
      },
      {
        $lookup: {
          from: "warehouse",
          localField: "a",
          foreignField: "_id",
          as: "b",
        },
      },
    ]);
    res.render("page/import/view", {
      title: "Tạo phiếu nhập",
      module: "Nhập hàng",
      heading: "Tạo phiếu",
      product: product[0],
    });
  }
}

module.exports = new ImportController();
